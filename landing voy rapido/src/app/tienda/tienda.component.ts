import { AuthService } from './../auth/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.scss'],
})
export class TiendaComponent implements OnInit {
  verNav: boolean = localStorage.getItem('nav') === 'true' ? true : false;
  verNotificaciones: boolean = false;
  verConfiguraciones: boolean = false;
  notificationsNotSeen: number = 0;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.updateProfile();
  }
}
