import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VerPublicacionesComponent } from './ver-publicaciones/ver-publicaciones.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'ver-publicaciones/:id',
        component: VerPublicacionesComponent
      },
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: '**',
        redirectTo: '404'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HemerotecaRoutingModule { }
