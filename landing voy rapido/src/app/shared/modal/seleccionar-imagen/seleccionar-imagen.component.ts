import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-seleccionar-imagen',
  templateUrl: './seleccionar-imagen.component.html',
  styleUrls: [
    './seleccionar-imagen.component.scss',
    '../../../shared/scss/modal-two.scss',
  ],
})
export class SeleccionarImagenComponent implements OnInit {
  fileImg: any;
  image: any;
  saveImage: boolean = false;
  imageChangedEvent: any;
  croppedImage: any;

  @Input() ver: boolean = false;
  @Output() cerrar = new EventEmitter<boolean>();
  @Output() imgReturn = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    var blob = this.dataURItoBlob(this.croppedImage);
    this.image = new File([blob], 'imagen_firma.jpg', { type: 'image/jpg' });
  }

  private dataURItoBlob(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  public onUploadImg(event: any) {
    this.fileImg = event.target.files[0];
    this.imageChangedEvent = event;

    if (this.fileImg) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileImg);
      reader.onload = (event: any) =>
        (this.image = event.target.result as string);
    } else {
      this.image = null;
    }
  }
}
