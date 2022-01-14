import { AuthService } from './../../../auth/shared/services/auth.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { User } from 'src/app/tienda/shared/interfaces/user.interface';
import { PaymentType } from 'src/app/tienda/shared/enums/payment-type.enum';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss', './nav-tienda.scss'],
})
export class NavComponent implements OnInit {
  private width: boolean;
  private currentUser: User;

  navHome: any[] = [
    { link: 'servicios', nombre: '¿Que hacemos?' },
    { link: 'cobertura', nombre: 'Cobertura' },
    { link: 'seguimiento', nombre: 'Seguimiento' },
    { link: 'nosotros', nombre: 'Nosotros' },
    { link: 'contactanos', nombre: 'Contáctanos' },
  ];

  navTienda: any[] = [];

  @Input() isTienda: boolean = false;
  @Input() verNav: boolean = false;
  @Output() close = new EventEmitter<boolean>();

  constructor(public breakObsrv: BreakpointObserver, private authService: AuthService) {}

  ngOnInit(): void {
    this.breakObsrv
      .observe(['(min-width: 768px)', '(orientation: portrait)', '(orientation: landscape)'])
      .subscribe((lay) => {
        this.width = lay.breakpoints['(min-width: 768px)'];
      });
    this.authService.currentProfile.subscribe((user) => {
      this.currentUser = user;
      this.setNavOptions();
    });
  }

  private setNavOptions() {
    this.navTienda = [
      {
        link: '',
        nombre: 'Inicio',
        icon: 'home',
        exact: true,
        is1024: true,
        show: true,
      },
      {
        link: 'perfil',
        nombre: 'Mis Datos',
        icon: 'cogs',
        exact: true,
        is1024: true,
        show: true,
      },
      {
        link: 'despachos',
        nombre: 'Despachos',
        icon: 'file-alt',
        exact: false,
        is1024: true,
        show: true,
      },
      {
        link: 'pagos-pendientes',
        nombre: 'Pagos pendientes',
        icon: 'clipboard-list',
        exact: true,
        is1024: true,
        show: true,
      },
      {
        link: 'pagos-realizados',
        nombre: 'Pagos realizados',
        icon: 'money-check-alt',
        exact: true,
        is1024: true,
        show: this.currentUser.paymentType === PaymentType.MONTHLY,
      },
    ];
  }

  closeNav() {
    this.close.emit(false);
  }

  closeNavTienda() {
    if (!this.width) this.close.emit(false);
  }
}
