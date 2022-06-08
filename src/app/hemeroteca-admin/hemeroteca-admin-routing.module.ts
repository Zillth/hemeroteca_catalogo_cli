import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './admins/admins.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';

const routes: Routes = [
  {
    path: 'publicaciones',
    component: PublicacionesComponent
  },
  {
    path: 'administradores',
    component: AdminsComponent
  },
  {
    path: '',
    redirectTo: 'publicaciones',
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HemerotecaAdminRoutingModule { }
