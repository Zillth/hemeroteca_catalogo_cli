import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HemerotecaAdminRoutingModule } from './hemeroteca-admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { AdminsComponent } from './admins/admins.component';
import { PublicacionFormComponent } from './forms/publicacion-form/publicacion-form.component';
import { FormsModule } from '@angular/forms';
import { DeleteComponent } from './forms/delete/delete.component';
import { AdminFormComponent } from './forms/admin-form/admin-form.component';


@NgModule({
  declarations: [
    PublicacionesComponent,
    AdminsComponent,
    PublicacionFormComponent,
    DeleteComponent,
    AdminFormComponent
  ],
  imports: [
    CommonModule,
    HemerotecaAdminRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class HemerotecaAdminModule { }
