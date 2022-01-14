import { EventEmitter2 } from '@nestjs/event-emitter';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionGuard } from './guards/subscriptions.guard';
import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { User } from 'src/shared/decorators/user.decorator';
import { CurrentUser } from '../auth/interfaces/current-user.interface';
import { ExistsDto as ExistsUserDto } from '../users/dto/exists.dto';
import { InjectUserToBody } from 'src/shared/decorators/inject-user.decorator';
import { Status } from './enums/status.enum';
import { PopulateInterceptor } from './interceptor/populate.interceptor';
import { CouponsService } from '../coupons/coupons.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoRemover } from '../photos/model/remover.model';
import { ChangeToPaidDto, ChangeToRevisionDto, ExistsDto, RejectedPaidDto, IsValidDispatchDto } from './dto';

@Roles(Role.ADMIN)
@ApiBearerAuth()
@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(
    private subscriptionsService: SubscriptionsService,
    private eventEmmiter: EventEmitter2,
    private couponsService: CouponsService,
  ) {}

  @UseInterceptors(PopulateInterceptor)
  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @UseInterceptors(PopulateInterceptor)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get('current-user')
  findAllByCurrentUser(@User() { _id }: CurrentUser) {
    return this.subscriptionsService.findAll({ user: _id });
  }

  @UseInterceptors(PopulateInterceptor)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get('not-payed')
  findAllByNotPayed() {
    return this.subscriptionsService.findAll({ status: Status.UNPAID });
  }

  @UseInterceptors(PopulateInterceptor)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get('current-user/not-payed')
  findAllByCurrentUserNotPayed(@User() { _id }: CurrentUser) {
    return this.subscriptionsService.findOne({ user: _id, status: Status.UNPAID });
  }

  @UseInterceptors(PopulateInterceptor)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get('current-user/revision')
  findAllByCurrentUserRevision(@User() { _id }: CurrentUser) {
    return this.subscriptionsService.findOne({ user: _id, status: Status.REVISION });
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('revision')
  findAllInRevision() {
    return this.subscriptionsService.findAll({ status: Status.REVISION });
  }

  @UseInterceptors(PopulateInterceptor)
  @ApiParam({ name: '_id' })
  @Get('user/:_id')
  findAllByUser(@Param() { _id }: ExistsUserDto) {
    return this.subscriptionsService.findAll({ user: _id });
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseInterceptors(PopulateInterceptor)
  @Get(':_id')
  findOne(@Param() { _id }: ExistsDto) {
    return this.subscriptionsService.findOne({ _id });
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseInterceptors(FileInterceptor('file'))
  @Post('change-to-revision')
  async changeToRevision(@Body() data: ChangeToRevisionDto, @UploadedFile() { filename }: Express.Multer.File) {
    const coupon = await this.couponsService.findOne({ code: data.coupon }).select('code discountRate -_id');
    const subscription = await this.subscriptionsService.updateOne(data._id, {
      status: Status.REVISION,
      capture: filename,
      coupon,
    });
    this.eventEmmiter.emit('subscription.revision', subscription);
    return 'Pago enviado al proceso de revisión';
  }

  @Roles(Role.ADMIN)
  @Post('accepted-paid')
  async changeToPaid(@Body() { _id }: ChangeToPaidDto) {
    await this.eventEmmiter.emitAsync('transfer.subscription', _id);
    return 'Pago aceptado';
  }

  @Roles(Role.ADMIN)
  @Post('rejected-paid')
  async rejectedPaid(@Body() { _id }: RejectedPaidDto) {
    const subscription = await this.subscriptionsService.findOne({ _id });
    new PhotoRemover(subscription.capture).remove();
    subscription.status = Status.UNPAID;
    subscription.coupon = null;
    subscription.capture = null;
    await subscription.save();
    this.eventEmmiter.emit('subscription.transfer.rejected', subscription);
    return 'Pago rechazado';
  }

  @InjectUserToBody()
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @UseGuards(SubscriptionGuard)
  @Post()
  async insert(@User() { _id }: CurrentUser, @Body() { dispatch }: IsValidDispatchDto) {
    const subscription = await this.subscriptionsService.exists(_id);
    return !!subscription
      ? this.subscriptionsService.insert(subscription, dispatch)
      : this.subscriptionsService.create(_id, dispatch);
  }
}
