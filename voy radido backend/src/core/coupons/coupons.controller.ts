import { IsValidInterceptor } from './interceptors/is-valid.interceptor';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Body, Controller, Delete, Get, Post, Put, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { CouponsService } from './coupons.service';
import { CreateDto, DiscountRateDto, ExistsManyDto, RenovateDto, SendUsersDto, StatusDto } from './dto';

@Roles(Role.ADMIN)
@ApiBearerAuth()
@ApiTags('Coupons')
@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService, private eventEmitter: EventEmitter2) {}

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.couponsService.create(createDto);
  }

  @UseInterceptors(IsValidInterceptor)
  @Get()
  async findAll() {
    return this.couponsService.findAll();
  }

  @Put('renovate')
  async update(@Body() { expirationTime, _id }: RenovateDto) {
    await this.couponsService.updateOne(_id, { expirationTime });
    return 'Cupón renovado';
  }

  @Put('change-discount-rate')
  async chengeDiscountRate(@Body() { discountRate, _id }: DiscountRateDto) {
    await this.couponsService.updateOne(_id, { discountRate });
    return 'Cupón actualizado';
  }

  @Put('change-status')
  async changeStatus(@Body() { status, _ids }: StatusDto) {
    await this.couponsService.updateMany(_ids, { status });
    return 'Cupón actualizado';
  }

  @Post('send-to-users')
  async sendToUsers(@Body() { users, _id }: SendUsersDto) {
    const coupon = await this.couponsService.findOne({ _id });
    await this.eventEmitter.emit('coupon.send', coupon, users);
    return 'Cupón enviado exitosamente';
  }

  @Delete()
  async remove(@Body() { _ids }: ExistsManyDto) {
    await this.couponsService.removeMany(_ids);
    return 'Cupones eliminados';
  }
}
