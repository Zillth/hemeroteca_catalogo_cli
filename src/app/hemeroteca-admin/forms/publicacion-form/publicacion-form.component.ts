import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { HemerotecaService } from 'src/app/hemeroteca/services/hemeroteca.service';
import { Hemeroteca } from 'src/app/model/Hemeroteca.model';
import { Tipo } from 'src/app/model/Tipo.model';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-publicacion-form',
  templateUrl: './publicacion-form.component.html',
  styleUrls: ['./publicacion-form.component.css']
})
export class PublicacionFormComponent implements OnInit {

  imgPrev: string | undefined;
  hemerotecas: Hemeroteca[] = [];
  categorias: Tipo[] = [];

  constructor(
    public dialogRef: MatDialogRef<PublicacionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private hemerotecaService: HemerotecaService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getHemerotecas();
    this.getCategorias();
    if(this.data.imagen != undefined) {
      this.imgPrev = this.data.imagen;
    }
  }

  getHemerotecas() {
    this.hemerotecaService.getHemerotecas().subscribe(res => {
      this.hemerotecas = [...res];
    })
  }

  getCategorias() {
    this.adminService.getCategorias().subscribe(res => {
      this.categorias = [...res];
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadImage = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const img: string = target.value
    this.imgPrev = img;
  }

  
}

export interface DialogData {
  id_publicacion: number | undefined;
  nombre: string;
  imagen: string;
  fecha_publicacion: Date;
  autor: string;
  descripcion: string;
  hemeroteca: number;
  tipo: number;
}
