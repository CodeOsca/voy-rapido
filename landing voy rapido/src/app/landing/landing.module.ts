import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { ScrollComponent } from './components/scroll/scroll.component';
import { SwiperComponent } from './components/swiper/swiper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrincipalComponent } from './components/principal/principal.component';

@NgModule({
  declarations: [
    HomeComponent,
    ScrollComponent,
    SwiperComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NgxUsefulSwiperModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class LandingModule {}
