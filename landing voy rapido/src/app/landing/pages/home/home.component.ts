import { PhotosService } from './../../services/photos.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Communes } from '../../constants/communes.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.scss',
    './comunas.scss',
    './nosotros.scss',
    './servicios.scss',
    './seguimiento.scss',
    './sociales.scss',
    './galeria.scss',
  ],
})
export class HomeComponent implements OnInit {
  API = environment.API;
  SIMPLIROUTE = environment.SIMPLIROUTE;

  formSimpliroute: FormGroup;

  communes = Communes;
  zones: any[] = [];
  photos: { name: string }[] = [];
  textButton: string = 'Ver mas';
  verImagenes: boolean = false;
  verErrorPhotos: boolean = false;
  loaderPhotos: boolean = true;
  whatsapp: string = environment.WHATSAPP;
  instagram: string = environment.INSTAGRAM;
  facebook: string = environment.FACEBOOK;

  constructor(private photosService: PhotosService, private fb: FormBuilder) {
    this.formSimpliroute = this.fb.group({
      tracking: ['', Validators.required],
    });
    this.zones.push({
      name: 'Santiago Urbano',
      color: '#de6438',
    });
    this.zones.push({
      name: 'Periferia y provincias',
      color: '#4c565a',
    });
  }

  ngOnInit(): void {
    this.getPhotos();
  }

  getPhotos() {
    this.loaderPhotos = true;
    this.photosService.getAll().subscribe(
      (photos) => {
        this.photos = photos;
        this.loaderPhotos = false;
      },
      (error) => {
        this.verErrorPhotos = true;
        this.loaderPhotos = false;
      }
    );
  }

  buttonImagenes() {
    this.textButton = this.verImagenes ? 'Ver mas' : 'Ver menos';
    this.verImagenes = !this.verImagenes;
  }

  submitSimpliroute() {
    window.open(
      `${this.SIMPLIROUTE}${this.formSimpliroute.value.tracking}`,
      '_blank'
    );
  }
}
