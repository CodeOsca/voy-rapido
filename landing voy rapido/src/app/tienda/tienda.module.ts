import { ProductsComponent } from './pages/products/products.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');

import { TiendaRoutingModule } from './tienda-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TiendaComponent } from './tienda.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { DetallesProductComponent } from './modal/detalles-product/detalles-product.component';
import { DispatchesComponent } from './pages/dispatches/dispatches.component';
import { ConfirmarComponent } from './modal/confirmar/confirmar.component';
import { AddProductComponent } from './modal/add-product/add-product.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EditarPerfilComponent } from './modal/editar-perfil/editar-perfil.component';
import { FallbackTextDirective } from './shared/directives/fallback-text.directive';
import { PagarFlowComponent } from './modal/pagar-flow/pagar-flow.component';
import { IncioComponent } from './pages/incio/incio.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { DetallesDespachoComponent } from './pages/detalles-despacho/detalles-despacho.component';
import { CurrentSubscripcionComponent } from './pages/current-subscripcion/current-subscripcion.component';
import { PagarFlowSubscriptionComponent } from './modal/pagar-flow-subscription/pagar-flow-subscription.component';
import { PaymentTypeSubscriptionDirective } from './shared/directives/payment-type-subscription.directive';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { CaptureComponent } from './components/capture/capture.component';

@NgModule({
  declarations: [
    TiendaComponent,
    HistoricoComponent,
    DetallesProductComponent,
    DispatchesComponent,
    ConfirmarComponent,
    ProductsComponent,
    AddProductComponent,
    PerfilComponent,
    EditarPerfilComponent,
    FallbackTextDirective,
    PagarFlowComponent,
    IncioComponent,
    ActividadesComponent,
    DetallesDespachoComponent,
    CurrentSubscripcionComponent,
    PagarFlowSubscriptionComponent,
    PaymentTypeSubscriptionDirective,
    SubscriptionComponent,
    CaptureComponent,
  ],
  imports: [
    CommonModule,
    TiendaRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es',
    },
    DatePipe,
  ],
})
export class TiendaModule {}
