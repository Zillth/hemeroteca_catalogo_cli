import { Component, OnInit } from '@angular/core';
import { HemerotecaService } from '../services/hemeroteca.service';
import { Router } from '@angular/router';
import { Hemeroteca } from '../../model/Hemeroteca.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private hemerotecaService: HemerotecaService, private router: Router) { }

  hemerotecas!: Hemeroteca[];
  ngOnInit(): void {
    this.obtenerHemerotecas();
  }

  obtenerHemerotecas() {
    this.hemerotecaService.getHemerotecas()
      .subscribe(res => {
        if (!Array.isArray(res)) {
          this.hemerotecas = [];
        } else {
          this.hemerotecas = [...res];
        }
      })
  }

}
