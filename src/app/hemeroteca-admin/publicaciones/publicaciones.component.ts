import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Publicacion } from 'src/app/model/Publicacion.model';
import { AdminService } from '../services/admin.service';
import { PublicacionFormComponent } from '../forms/publicacion-form/publicacion-form.component';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DeleteComponent } from '../forms/delete/delete.component';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],
})
export class PublicacionesComponent implements AfterViewInit, OnInit {
  id_publicacion: number | undefined;
  nombre: string | undefined;
  imagen: string | undefined;
  fecha_publicacion: Date | undefined;
  autor: string | undefined;
  descripcion: string | undefined;
  hemeroteca: number | undefined;
  tipo: number | undefined;

  displayedColumns: string[] = [
    'imagen',
    'publicación',
    'descripción',
    'categoria',
    'autor',
    'fecha',
    'hemeroteca',
    'acciones',
  ];
  dataSource = new MatTableDataSource<Publicacion>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator | null;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getPublicaciones();
  }

  getPublicaciones() {
    this.adminService.getPublicaciones().subscribe((res: any) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<Publicacion>([...res]);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  openUpdateWindow(publicacion: Publicacion): void {
    this.id_publicacion = publicacion.id_publicacion;
    this.nombre = publicacion.nombre;
    this.imagen = publicacion.imagen;
    this.fecha_publicacion = publicacion.fecha_publicacion;
    this.fecha_publicacion = new Date(this.fecha_publicacion!);
    this.fecha_publicacion.setDate(this.fecha_publicacion.getDate() + 1);
    this.autor = publicacion.autor;
    this.descripcion = publicacion.descripcion;
    this.hemeroteca = publicacion.id_hemeroteca;
    this.tipo = publicacion.id_tipo;
    this.openForm();
  }

  openAddWindow(): void {
    this.id_publicacion = undefined;
    this.nombre = undefined;
    this.imagen = undefined;
    this.fecha_publicacion = undefined;
    this.fecha_publicacion = undefined;
    this.autor = undefined;
    this.descripcion = undefined;
    this.hemeroteca = undefined;
    this.tipo = undefined;
    this.openForm();
  }

  openDeleteWindow(publicacion: Publicacion): any {
    if (
      publicacion.id_publicacion != undefined &&
      publicacion.nombre != undefined
    ) {
      this.openDelete(publicacion.id_publicacion, publicacion.nombre);
    }
  }

  openDelete(id: number, nombre: string): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '320px',
      data: {
        id: id,
        nombre: nombre,
        action: undefined,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result['action'] != undefined && result['action']) {
          this.authService.verifyAutentication().subscribe((res) => {
            if (!res) {
              this.authService.logout();
            }
          });
          this.adminService.deletePublicacion(result['id']).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open(
                'Se ha eliminado la publicación con éxito',
                '',
                {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-primary'],
                }
              );
              this.getPublicaciones();
            } else {
              this._snackBar.open('Algo ha ocurrido, intentelo más tarde', '', {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-warn'],
              });
            }
          });
        }
      }
    });
  }

  openForm(): void {
    const dialogRef = this.dialog.open(PublicacionFormComponent, {
      width: '450px',
      data: {
        id_publicacion: this.id_publicacion,
        nombre: this.nombre,
        imagen: this.imagen,
        fecha_publicacion: this.fecha_publicacion,
        autor: this.autor,
        descripcion: this.descripcion,
        hemeroteca: this.hemeroteca,
        tipo: this.tipo,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });
        if (result['imagen'].length >= 15000) {
          this._snackBar.open(
            'La imagen no se ha procesado correctamente, intentelo con otra imagen',
            '',
            {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            }
          );
        } else {
          result['fecha_publicacion'] = formatDate(
            result['fecha_publicacion'],
            'yyyy-MM-dd',
            'en-US'
          );
          if (result['id_publicacion'] == undefined) {
            this.adminService
              .createPublicacion({
                id_publicacion: undefined,
                nombre: result.nombre,
                imagen: result.imagen,
                fecha_publicacion: result.fecha_publicacion,
                autor: result.autor,
                descripcion: result.descripcion,
                id_hemeroteca: result.hemeroteca,
                id_tipo: result.tipo,
                categoria: undefined,
                nombre_hemeroteca: undefined,
              })
              .subscribe((res) => {
                if (res.length == 0) {
                  this._snackBar.open(
                    'Se ha agregado la publicación con éxito',
                    '',
                    {
                      duration: 3000,
                      panelClass: ['mat-toolbar', 'mat-primary'],
                    }
                  );
                  this.getPublicaciones();
                } else {
                  this._snackBar.open(
                    'Algo ha ocurrido, intentelo más tarde',
                    '',
                    {
                      duration: 3000,
                      panelClass: ['mat-toolbar', 'mat-warn'],
                    }
                  );
                }
              });
          } else if (result['id_publicacion'] > 0) {
            this.adminService
              .modifyPublicacion({
                id_publicacion: result.id_publicacion,
                nombre: result.nombre,
                imagen: result.imagen,
                fecha_publicacion: result.fecha_publicacion,
                autor: result.autor,
                descripcion: result.descripcion,
                id_hemeroteca: result.hemeroteca,
                id_tipo: result.tipo,
                categoria: undefined,
                nombre_hemeroteca: undefined,
              })
              .subscribe((res) => {
                if (res.length == 0) {
                  this._snackBar.open(
                    'Se ha modificado la publicación con éxito',
                    '',
                    {
                      duration: 3000,
                      panelClass: ['mat-toolbar', 'mat-primary'],
                    }
                  );
                  this.getPublicaciones();
                } else {
                  this._snackBar.open(
                    'Algo ha ocurrido, intentelo más tarde',
                    '',
                    {
                      duration: 3000,
                      panelClass: ['mat-toolbar', 'mat-warn'],
                    }
                  );
                }
              });
          }
        }
      }
    });
  }
}
