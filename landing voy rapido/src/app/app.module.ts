import { SharedModule } from './shared/shared.module';
import { HTTP_ERROR_INTERCEPTOR } from './shared/interceptors/error.interceptor';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
  ],
  providers: [HTTP_ERROR_INTERCEPTOR],
  bootstrap: [AppComponent],
})
export class AppModule {}
