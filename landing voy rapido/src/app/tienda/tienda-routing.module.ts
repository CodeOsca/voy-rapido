import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HistoricoComponent } from './pages/historico/historico.component';
import { TiendaComponent } from './tienda.component';
import { DispatchesComponent } from './pages/dispatches/dispatches.component';
import { ProductsComponent } from './pages/products/products.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { IncioComponent } from './pages/incio/incio.component';
import { DetallesDespachoComponent } from './pages/detalles-despacho/detalles-despacho.component';
import { CurrentSubscripcionComponent } from './pages/current-subscripcion/current-subscripcion.component';

const routes: Routes = [
  {
    path: '',
    component: TiendaComponent,
    children: [
      {
        path: '',
        component: IncioComponent,
      },
      {
        path: 'pagos-realizados',
        component: HistoricoComponent,
      },
      {
        path: 'despacho/:_id',
        component: DetallesDespachoComponent,
      },
      {
        path: 'despachos',
        component: DispatchesComponent,
      },
      {
        path: 'productos/:_id',
        component: ProductsComponent,
      },
      {
        path: 'perfil',
        component: PerfilComponent,
      },
      {
        path: 'pagos-pendientes',
        component: CurrentSubscripcionComponent,
      },
      {
        path: 'resumen/:_id',
        component: SubscriptionComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiendaRoutingModule {}
