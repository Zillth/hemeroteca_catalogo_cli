import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Publicacion } from '../../model/Publicacion.model';
import { HemerotecaService } from '../services/hemeroteca.service';

@Component({
  selector: 'app-ver-publicaciones',
  templateUrl: './ver-publicaciones.component.html',
  styleUrls: ['./ver-publicaciones.component.css'],
})
export class VerPublicacionesComponent implements OnInit {
  publicaciones!: Publicacion[];

  constructor(
    private hemerotecaService: HemerotecaService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.obtenerPublicaciones();
  }

  obtenerPublicaciones() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.hemerotecaService.getPublicaciones(id)))
      .subscribe((res) => {
        if (!Array.isArray(res)) {
          this.publicaciones = [];
        } else {
          this.publicaciones = [...res];
        }
      });
  }
}
