import { environment } from './../../../../environments/environment';
import { User } from './../../shared/interfaces/user.interface';
import { AuthService } from './../../../auth/shared/services/auth.service';
import { Comment } from './../../shared/interfaces/comment.interface';
import { UsersService } from './../../shared/services/users.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss', '../../../shared/scss/main.scss'],
})
export class PerfilComponent implements OnInit {
  verEditarPerfil: boolean = false;
  verSeleccionarImagen: boolean = false;
  verCalificarServicio: boolean = false;
  user: User;
  API = environment.API;
  constructor(
    private alertService: AlertService,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentProfile.subscribe((user) => {
      this.user = user;
    });
  }

  updateUser(user: User) {
    this.usersService.update(user).subscribe(this.success, this.error);
  }

  guardarImagenPerfil(image: File) {
    if (image) {
      this.usersService.uploadImage(image).subscribe(this.success, this.error);
      this.verSeleccionarImagen = false;
    }
  }

  setComment(comment: Comment) {
    this.usersService.setComment(comment).subscribe(this.success, this.error);
  }

  private success = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'update' });
    this.authService.updateProfile();
  };
  private error = (message: string) => {
    this.alertService.setAlert({ mensaje: message, tipo: 'error' });
  };
}
