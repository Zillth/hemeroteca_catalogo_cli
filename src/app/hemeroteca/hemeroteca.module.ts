import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HemerotecaRoutingModule } from './hemeroteca-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { VerPublicacionesComponent } from './ver-publicaciones/ver-publicaciones.component';


@NgModule({
  declarations: [
    HomeComponent,
    VerPublicacionesComponent
  ],
  imports: [
    CommonModule,
    HemerotecaRoutingModule,
    MaterialModule,
  ]
})
export class HemerotecaModule { }
