import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./hemeroteca-admin/hemeroteca-admin.module').then((m) => m.HemerotecaAdminModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: ErrorComponent
  },
  {
    path: '',
    loadChildren: () => import('./hemeroteca/hemeroteca.module').then((m) => m.HemerotecaModule)
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
