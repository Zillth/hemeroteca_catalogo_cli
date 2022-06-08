import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hemeroteca } from 'src/app/model/Hemeroteca.model';
import { Observable } from 'rxjs';
import { Publicacion } from 'src/app/model/Publicacion.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HemerotecaService {

  private baseUrl: string = environment.baseUrl + "/hemeroteca";
  private baseUrlPub: string = environment.baseUrl + "/publicacion";


  constructor(private http: HttpClient) { }

  getHemerotecas() : Observable<Hemeroteca[]> {
    
    
    return this.http.get<Hemeroteca[]>(this.baseUrl + "/completa");
  }

  getPublicaciones(id_hemeroteca: number) : Observable<Publicacion[]> {
    return this.http.get<Publicacion[]>(this.baseUrlPub + "/hemeroteca/" + id_hemeroteca);
  }
}
