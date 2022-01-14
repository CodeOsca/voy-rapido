import { PhotoRemover } from './../photos/model/remover.model';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CurrentUser } from './../auth/interfaces/current-user.interface';
import { Controller, Get, Body, Param, Delete, Put, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { ApiFile } from 'src/shared/decorators/api-singlefile.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/shared/decorators/user.decorator';
import { PaymentType } from './enums/payment-type.enum';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { ExistsDto, PaymentTypeUsersDto, StatusUsersDto, UpdateDto } from './dto';

@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
@Roles(Role.ADMIN)
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private eventEmmiter: EventEmitter2) {}

  @Get()
  findAll() {
    return this.usersService.findAll({ verified: true, role: Role.CUSTOMER }).populate('commune');
  }

  @Get('requests')
  findAllRequests() {
    return this.usersService.findAll({ verified: false });
  }

  @ApiParam({ name: '_id' })
  @Get(':_id')
  async findOne(@Param() { _id }: ExistsDto) {
    return this.usersService.findOne({ _id }).populate('commune');
  }

  @Put('change-status')
  async changeStatus(@Body() { status, _ids }: StatusUsersDto) {
    await this.usersService.updateMany(_ids, { status });
    return 'Usuarios actualizados';
  }

  @Put('change-payment-type')
  async changePaymentType(@Body() { paymentType, _id }: PaymentTypeUsersDto) {
    const user = await this.usersService.findOne({ _id });
    user.paymentType = paymentType;
    paymentType === PaymentType.MONTHLY
      ? this.eventEmmiter.emit('user.subscription.enable', user)
      : this.eventEmmiter.emit('user.subscription.disabled', user);
    await user.save();
    return 'Usuario actualizado';
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Put()
  async update(@Body() updateUserDto: UpdateDto) {
    await this.usersService.updateOne(updateUserDto._id, updateUserDto);
    return 'Usuario actualizado';
  }

  @ApiParam({ name: '_id' })
  @Delete(':_id')
  async remove(@Param() { _id }: ExistsDto) {
    await this.usersService.removeOne(_id);
    return 'Usuario eliminado';
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() { filename }: Express.Multer.File, @User() { _id }: CurrentUser) {
    const { image } = await this.usersService.findOne({ _id });
    await this.usersService.updateOne(_id, { image: filename });
    new PhotoRemover(image).remove();
    return 'Foto actualizada';
  }
}
