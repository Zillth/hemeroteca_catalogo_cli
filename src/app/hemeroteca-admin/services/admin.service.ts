import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Admin } from 'src/app/model/Admin.model';
import { Publicacion } from 'src/app/model/Publicacion.model';
import { Tipo } from 'src/app/model/Tipo.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getPublicaciones(): Observable<Publicacion[]> {
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `${this.authService.getToken()}`
      ),
    };
    return this.http.get<Publicacion[]>(
      this.baseUrl + '/publicacion/completa',
      header
    );
  }

  getCategorias(): Observable<Tipo[]> {
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `${this.authService.getToken()}`
      ),
    };
    return this.http.get<Tipo[]>(this.baseUrl + '/tipo', header);
  }

  getAdmins(): Observable<Admin[]> {
    let header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `${this.authService.getToken()}`
      ),
    };
    return this.http.get<Admin[]>(this.baseUrl + '/admin', header);
  }

  createAdmin(admin: Admin) {
    const requestOptions: Object = {
      responseType: 'text',
      headers: new HttpHeaders()
        .set('Access-Control-Allow-Origin', this.baseUrl)
        .set('Authorization', `${this.authService.getToken()}`),
    };
    return this.http.post<string>(
      this.baseUrl + '/admin',
      {
        username: admin.username,
        password: admin.password
      },
      requestOptions
    );
  }

  deleteAdmin(id: number) {
    const requestOptions: Object = {
      responseType: 'text',
      headers: new HttpHeaders()
        .set('Access-Control-Allow-Origin', this.baseUrl)
        .set('Authorization', `${this.authService.getToken()}`),
    };
    return this.http.delete<string>(
      this.baseUrl + '/admin/' + id,
      requestOptions
    );
  }

  createPublicacion(publicacion: Publicacion) {
    const requestOptions: Object = {
      responseType: 'text',
      headers: new HttpHeaders()
        .set('Access-Control-Allow-Origin', this.baseUrl)
        .set('Authorization', `${this.authService.getToken()}`),
    };
    return this.http.post<string>(
      this.baseUrl + '/publicacion',
      {
        nombre: publicacion.nombre,
        imagen: publicacion.imagen,
        fecha_publicacion: publicacion.fecha_publicacion,
        autor: publicacion.autor,
        descripcion: publicacion.descripcion,
        id_hemeroteca: publicacion.id_hemeroteca,
        id_tipo: publicacion.id_tipo,
      },
      requestOptions
    );
  }

  modifyPublicacion(publicacion: Publicacion) {
    const requestOptions: Object = {
      responseType: 'text',
      headers: new HttpHeaders()
        .set('Access-Control-Allow-Origin', this.baseUrl)
        .set('Authorization', `${this.authService.getToken()}`),
    };
    return this.http.put<string>(
      this.baseUrl + '/publicacion',
      {
        id_publicacion: publicacion.id_publicacion,
        nombre: publicacion.nombre,
        imagen: publicacion.imagen,
        fecha_publicacion: publicacion.fecha_publicacion,
        autor: publicacion.autor,
        descripcion: publicacion.descripcion,
        id_hemeroteca: publicacion.id_hemeroteca,
        id_tipo: publicacion.id_tipo,
      },
      requestOptions
    );
  }

  deletePublicacion(id: number) {
    const requestOptions: Object = {
      responseType: 'text',
      headers: new HttpHeaders()
        .set('Access-Control-Allow-Origin', this.baseUrl)
        .set('Authorization', `${this.authService.getToken()}`),
    };
    return this.http.delete<string>(
      this.baseUrl + '/publicacion/' + id,
      requestOptions
    );
  }
}
