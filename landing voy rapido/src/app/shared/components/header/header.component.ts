import { Notification } from '../../interfaces/notifications.interface';
import { User } from './../../../tienda/shared/interfaces/user.interface';
import { AuthService } from './../../../auth/shared/services/auth.service';
import {
  Component,
  OnInit,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', './header-tienda.scss'],
})
export class HeaderComponent implements OnInit {
  user: User;
  verNav: boolean = false;
  headerColor: boolean = false;
  facebook: string = environment.FACEBOOK;
  instagram: string = environment.INSTAGRAM;
  whatsapp: string = environment.WHATSAPP;

  @Input() isTienda: boolean = false;
  @Input() nav: boolean = false;
  @Input() notificaciones: boolean = false;
  @Input() notificationsNotSeen: number = 0;
  @Input() configuraciones: boolean = false;
  @Output() verNavTienda = new EventEmitter<boolean>();
  @Output() verNotificaciones = new EventEmitter<boolean>();
  @Output() verConfiguraciones = new EventEmitter<boolean>();

  @HostListener('window:scroll', ['$event'])
  doSomethingOnWindowsScroll($event: any) {
    this.headerColor = $event.srcElement.children[0].scrollTop > 10;
  }

  constructor(private authServices: AuthService) {}

  ngOnInit(): void {
    this.authServices.currentProfile.subscribe((user) => {
      this.user = user;
    });
  }

  navTienda(valor: boolean) {
    this.nav = valor;
    this.verNavTienda.emit(valor);
    localStorage.setItem('nav', `${valor}`);
  }

  verMisNotificaciones() {
    this.verNotificaciones.emit(!this.notificaciones);
  }

  verMiConfiguracion() {
    this.verConfiguraciones.emit(!this.configuraciones);
  }
}
