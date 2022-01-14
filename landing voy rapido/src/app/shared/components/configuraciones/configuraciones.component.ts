import { environment } from './../../../../environments/environment';
import { User } from './../../../tienda/shared/interfaces/user.interface';
import { AuthService } from './../../../auth/shared/services/auth.service';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.component.html',
  styleUrls: ['./configuraciones.component.scss'],
})
export class ConfiguracionesComponent implements OnInit {
  API = environment.API;
  focusComponent: boolean = true;
  user: User;
  @Input() verConfiguraciones: boolean = false;
  @Output() closeConfiguraciones = new EventEmitter<boolean>();

  @HostListener('click')
  clickInside() {
    this.focusComponent = true;
  }

  @HostListener('document:click')
  clickout() {
    if (this.focusComponent && this.verConfiguraciones) {
      this.focusComponent = false;
    } else {
      this.closeConfiguraciones.emit(false);
      this.focusComponent = true;
    }
  }

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentProfile.subscribe((user) => {
      this.user = user;
    });
  }

  navClose() {
    this.closeConfiguraciones.emit(false);
  }

  logout() {
    this.authService.logOut();
  }
}
