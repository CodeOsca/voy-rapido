import { PopulateInterceptor } from './interceptors/populate.interceptor';
import { ExistsDto as ExistsUserDto } from '../users/dto/exists.dto';
import { CurrentUser } from 'src/core/auth/interfaces/current-user.interface';
import { ExistsDto } from './dto/exists.dto';
import { OrdersService } from './orders.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { User } from 'src/shared/decorators/user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/enums/role.enum';
import { QueryDateDto } from './dto/query-date.dto';

@Roles(Role.ADMIN)
@ApiBearerAuth()
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersServices: OrdersService) {}

  @UseInterceptors(PopulateInterceptor)
  @Get()
  findAll() {
    return this.ordersServices.findAll();
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('date')
  findAllByDate(@Query() { start, end }: QueryDateDto) {
    return this.ordersServices.findAll({ createdAt: { $gte: start, $lt: end } });
  }

  @UseInterceptors(PopulateInterceptor)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get('current-user')
  findAllByCurrentUser(@User() { _id }: CurrentUser) {
    return this.ordersServices.findAll({ user: _id });
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get('amount-paid')
  amountPaid() {
    return this.ordersServices.length() ? this.ordersServices.amountPaid() : 0;
  }

  @UseInterceptors(PopulateInterceptor)
  @Get('user/:_id')
  findAllByUser(@Param() { _id }: ExistsUserDto) {
    return this.ordersServices.findAll({ user: _id });
  }

  @UseInterceptors(PopulateInterceptor)
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get(':_id')
  findOne(@Param() { _id }: ExistsDto) {
    return this.ordersServices.findOne({ _id });
  }

  @ApiParam({ name: '_id' })
  @Delete(':_id')
  async remove(@Param() { _id }: ExistsDto) {
    await this.ordersServices.remove(_id);
    return 'Orden eliminada';
  }
}
