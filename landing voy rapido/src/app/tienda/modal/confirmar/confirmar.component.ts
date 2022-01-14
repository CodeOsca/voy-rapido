import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Confirmar } from '../../shared/interfaces/confirmar.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: [
  	'./confirmar.component.scss',
  	'../../../shared/scss/modal.scss'
  ]
})
export class ConfirmarComponent implements OnInit {

	@Input() datos: Confirmar;
	@Input() ver: boolean = false;
  @Output() cerrar = new EventEmitter<boolean>();
	@Output() aceptar = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
