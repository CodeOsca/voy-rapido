import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/shared/guards/auth.guard';
import { LandingModule } from './landing/landing.module';
import { TiendaModule } from './tienda/tienda.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => LandingModule,
  },
  {
    path: '',
    loadChildren: () => AuthModule,
  },
  {
    path: 'tienda',
    loadChildren: () => TiendaModule,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
