import { RouterModule } from '@angular/router';
import { MaterialModule } from './../material/material.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ImageCropperModule } from 'ngx-image-cropper';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { AlertComponent } from './components/alert/alert.component';
import { SeleccionarImagenComponent } from './modal/seleccionar-imagen/seleccionar-imagen.component';
import { CalificarServicioComponent } from './modal/calificar-servicio/calificar-servicio.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { ConfiguracionesComponent } from './components/configuraciones/configuraciones.component';
import { SocketIoModule } from 'ngx-socket-io';
import { TableComponent } from './components/table/table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { InputGooglePlaceComponent } from './components/input-google-place/input-google-place.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AlertComponent,
    SeleccionarImagenComponent,
    CalificarServicioComponent,
    CalendarioComponent,
    NotificacionesComponent,
    ConfiguracionesComponent,
    TableComponent,
    LoaderComponent,
    InputGooglePlaceComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ImageCropperModule,
    ReactiveFormsModule,
    SocketIoModule,
    GooglePlaceModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AlertComponent,
    SeleccionarImagenComponent,
    CalificarServicioComponent,
    CalendarioComponent,
    NotificacionesComponent,
    ConfiguracionesComponent,
    TableComponent,
    LoaderComponent,
    InputGooglePlaceComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    DatePipe,
    InputGooglePlaceComponent,
  ],
})
export class SharedModule {}
