import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [
    './footer.component.scss',
    './footer-tienda.scss',
  ]
})
export class FooterComponent implements OnInit {

  facebook: string = environment.FACEBOOK;
  instagram: string = environment.INSTAGRAM;
  whatsapp: string = environment.WHATSAPP;

  navHome: any[] = [
    { link: 'servicios', nombre: '¿Que hacemos?' },
    { link: 'cobertura', nombre: 'Cobertura' },
    { link: 'seguimiento', nombre: 'Seguimiento' },
    { link: 'nosotros', nombre: 'Nosotros' },
    { link: 'contactanos', nombre: 'Contáctanos' },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
