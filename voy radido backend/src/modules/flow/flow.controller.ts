import { CanPayDto } from '../../core/subscriptions/dto/can-pay.dto';
import { ConfigService } from '@nestjs/config';
import { CurrentUser } from './../../core/auth/interfaces/current-user.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FlowService } from './flow.service';
import { CreateFlowDto } from './dto/create-flow.dto';
import { Body, Controller, Post, Res, BadRequestException } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import { SkipAuth } from 'src/core/auth/decorators/is-public.decorator';
import { Response } from 'express';
import { successPaid } from './templates/success-paid';
import { InjectUserToBody } from 'src/shared/decorators/inject-user.decorator';

@ApiBearerAuth()
@ApiTags('Flow')
@Controller('flow')
export class FlowController {
  constructor(private flowService: FlowService, private configService: ConfigService) {}

  @InjectUserToBody()
  @Post()
  async create(@Body() { dispatch, coupon }: CreateFlowDto, @User() { _id }: CurrentUser) {
    try {
      const url = await this.flowService.payment(_id, dispatch, coupon);
      return url;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  @InjectUserToBody()
  @Post('subscription')
  async paymentSubscription(@Body() subscription: CanPayDto, @User() { _id }: CurrentUser) {
    try {
      const url = await this.flowService.paymentSubscription(_id, subscription._id, subscription.coupon);
      return url;
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  @SkipAuth()
  @Post('result/payment')
  async result(@Body() { token }, @Res() response: Response) {
    try {
      await this.flowService.resultPayment(token);
      const url = this.configService.get('FRONTEND_URL');
      const html = successPaid(url);
      response.send(html);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }

  @SkipAuth()
  @Post('result/subscription')
  async resultSubscription(@Body() { token }, @Res() response: Response) {
    try {
      await this.flowService.resultSubscription(token);
      const url = this.configService.get('FRONTEND_URL');
      const html = successPaid(url);
      response.send(html);
    } catch ({ message }) {
      throw new BadRequestException(message);
    }
  }
}
