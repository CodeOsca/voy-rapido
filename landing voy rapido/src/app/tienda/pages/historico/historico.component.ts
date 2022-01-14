import { TypeReference } from './../../shared/enums/type-reference.enum';
import { HistoricoColumns } from '../../shared/constants/historico.constant';
import { OrdersService } from './../../shared/services/orders.service';
import { Component, AfterViewInit } from '@angular/core';
import { Order } from '../../shared/interfaces/order.interface';
import { filterOptions } from '../../shared/constants/order-filter.constant';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['../../../shared/scss/main.scss', '../../../shared/scss/table.scss', './historico.component.scss'],
})
export class HistoricoComponent implements AfterViewInit {
  filterOptions = filterOptions;
  selectedOrder: Order;
  orders: Order[];
  verOrder: boolean = false;
  columns = HistoricoColumns;

  constructor(private ordersService: OrdersService) {}

  ngAfterViewInit() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  link(order: Order) {
    if (TypeReference.DISPATCH === order.typeReference) {
      return '/tienda/despacho/' + order.reference;
    } else {
      return '/tienda/resumen/' + order.reference;
    }
  }
}
