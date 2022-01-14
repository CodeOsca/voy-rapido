import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-detalles-product',
  templateUrl: './detalles-product.component.html',
  styleUrls: [
    './detalles-product.component.scss',
    '../../../shared/scss/modal.scss',
  ],
})
export class DetallesProductComponent implements OnInit {
  @Input() product: Product;
  @Input() ver: boolean = false;
  @Output() cerrar = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}
}
