import { PhotoRemover } from './../photos/model/remover.model';
import { CouponsService } from './../coupons/coupons.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PopulateInterceptor } from './interceptors/populate.interceptor';
import { Status } from './enums/status.enum';
import { CurrentUser } from './../auth/interfaces/current-user.interface';
import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/core/auth/decorators/roles.decorator';
import { Role } from 'src/core/users/enums/role.enum';
import { User } from 'src/shared/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectUserToBody } from 'src/shared/decorators/inject-user.decorator';
import {
  ChangeAmountDto,
  ChangeToPaidDto,
  ChangeToRevisionDto,
  CreateDto,
  ExistsDto,
  RejectedPaidDto,
  RemoveDto,
  RescheduleRetirementDateDto,
} from './dto';
import { DispatchesService } from './dispatches.service';
import { FilterToWithdrawInterceptor } from './interceptors/filter-to-withdraw.interceptor';
import { RetirementDateGenerator } from './models/retirementDate-generator.model';
import { DateString } from 'src/shared/services/date/date-string.service';

@ApiBearerAuth()
@ApiTags('Dispatches')
@Controller('dispatches')
export class DispatchesController {
  constructor(
    private readonly dispatchesServices: DispatchesService,
    private eventEmmiter: EventEmitter2,
    private couponsService: CouponsService,
    private eventEmitter: EventEmitter2,
  ) {}

  @InjectUserToBody()
  @Post()
  create(@Body() createDto: CreateDto, @User() { _id }: CurrentUser) {
    createDto['user'] = _id;
    createDto['retirementDate'] = new RetirementDateGenerator().generate();
    return this.dispatchesServices.create(createDto);
  }

  @UseInterceptors(PopulateInterceptor)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.dispatchesServices.findAll();
  }

  @UseInterceptors(PopulateInterceptor)
  @Roles(Role.ADMIN)
  @Get('all-active')
  findAllActive() {
    return this.dispatchesServices.findByStatus([Status.PAID, Status.SUBSCRIPTION]);
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('current-user')
  findAllByCurrentUser(@User() { _id }: CurrentUser) {
    return this.dispatchesServices.findAll({ user: _id });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('current-user/all-active')
  findAllByCurrentUserAllActive(@User() { _id }: CurrentUser) {
    return this.dispatchesServices.findByUserAndStatus(_id, [Status.PAID, Status.SUBSCRIPTION]);
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('current-user/revision')
  findAllByCurrentUserRevision(@User() { _id }: CurrentUser) {
    return this.dispatchesServices.findAll({ user: _id, status: Status.REVISION });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('revision')
  findAllInRevision() {
    return this.dispatchesServices.findAll({ status: Status.REVISION });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('current-user/not-payed-or-subscribed')
  findAllByCurrentUserNotPayed(@User() { _id }: CurrentUser) {
    return this.dispatchesServices.findByUserAndStatus(_id, [Status.UNPAID]);
  }

  @UseInterceptors(PopulateInterceptor, FilterToWithdrawInterceptor)
  @Get('pending-to-withdraw')
  findAllPendingToWithdraw() {
    return this.dispatchesServices.findAllPendingToWithdraw();
  }

  @UseInterceptors(PopulateInterceptor)
  @ApiParam({ name: '_id' })
  @Get(':_id')
  async findOne(@Param() { _id }: ExistsDto) {
    return this.dispatchesServices.findOne({ _id });
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseInterceptors(FileInterceptor('file'))
  @Post('change-to-revision')
  async changeToRevision(@Body() data: ChangeToRevisionDto, @UploadedFile() { filename }: Express.Multer.File) {
    const coupon = await this.couponsService.findOne({ code: data.coupon }).select('code discountRate -_id');
    const dispatch = await this.dispatchesServices.updateOne(data._id, {
      status: Status.REVISION,
      capture: filename,
      coupon,
    });
    this.eventEmmiter.emit('dispatch.revision', dispatch);
    return 'Despacho enviado al proceso de revisión';
  }

  @Roles(Role.ADMIN)
  @Post('accepted-paid')
  async changeToPaid(@Body() { _id }: ChangeToPaidDto) {
    await this.eventEmmiter.emitAsync('transfer.payment', _id);
    return 'Pago aceptado';
  }

  @Roles(Role.ADMIN)
  @Post('rejected-paid')
  async rejectedPaid(@Body() { _id }: RejectedPaidDto) {
    const dispatch = await this.dispatchesServices.findOne({ _id });
    new PhotoRemover(dispatch.capture).remove();
    dispatch.status = Status.UNPAID;
    dispatch.coupon = null;
    dispatch.capture = null;
    await dispatch.save();
    this.eventEmmiter.emit('dispatch.transfer.rejected', dispatch);
    return 'Pago rechazado';
  }

  @Roles(Role.ADMIN)
  @Put('retirement-date')
  async rescheduleRetirementDate(@Body() { _id, retirementDate }: RescheduleRetirementDateDto) {
    await this.dispatchesServices.updateOne(_id, { retirementDate: new DateString(retirementDate).date });
    return 'Despacho actualizado';
  }

  @Roles(Role.ADMIN)
  @Put('amount')
  async changePrice(@Body() { _id, amount }: ChangeAmountDto) {
    const dispatch = await this.dispatchesServices.findOne({ _id });
    dispatch.amount = amount;
    await dispatch.save();
    this.eventEmitter.emit('dispatch.change-amount', dispatch);
    return 'Despacho actualizado';
  }

  @ApiParam({ name: '_id' })
  @Delete(':_id')
  async remove(@Param() { _id }: RemoveDto) {
    await this.dispatchesServices.removeOne(_id);
    return 'Despacho eliminado';
  }
}
