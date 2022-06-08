import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Admin } from 'src/app/model/Admin.model';
import { AdminFormComponent } from '../forms/admin-form/admin-form.component';
import { DeleteComponent } from '../forms/delete/delete.component';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  id_admin: number | undefined;
  username: string | undefined;
  password: string | undefined;
  confirm_password: string | undefined;

  displayedColumns: string[] = ['id_admin', 'username', 'acciones'];
  dataSource = new MatTableDataSource<Admin>();

  @ViewChild(MatPaginator) paginator!: MatPaginator | null;

  constructor(
    private adminService: AdminService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(): void {
    this.adminService.getAdmins().subscribe((res) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource<Admin>([...res]);
      }
    });
  }

  isSuperAdmin(): boolean {
    return localStorage.getItem('admin') == 'hemeroteca_admin';
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminarAdmin(admin: Admin) {
    if(admin.id_admin != undefined && admin.username != undefined) {
      this.openDelete(admin.id_admin, admin.username);
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
          this.adminService.deleteAdmin(result['id']).subscribe((res) => {
            if (res.length == 0) {
              this._snackBar.open(
                'Se ha eliminado el administrador con éxito',
                '',
                {
                  duration: 3000,
                  panelClass: ['mat-toolbar', 'mat-primary'],
                }
              );
              this.getAdmins();
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
    });
  }

  openAddAdmin() {
    const dialogRef = this.dialog.open(AdminFormComponent, {
      width: '320px',
      data: {
        id_admin: this.id_admin,
        username: this.username,
        password: this.password,
        confirm_password: this.confirm_password,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if(result['password'] != result['confirm_password']) {
          this._snackBar.open(
            'Las contraseñas no coinciden',
            '',
            {
              duration: 3000,
              panelClass: ['mat-toolbar', 'mat-warn'],
            }
          );
          return;
        }
        this.authService.verifyAutentication().subscribe((res) => {
          if (!res) {
            this.authService.logout();
          }
        });
        this.adminService.createAdmin({
          id_admin: undefined,
          username: result.username,
          password: result.password
        }).subscribe((res) => {
          if (res.length == 0) {
            this._snackBar.open(
              'Se ha agregado el administrador con éxito',
              '',
              {
                duration: 3000,
                panelClass: ['mat-toolbar', 'mat-primary'],
              }
            );
            this.getAdmins();
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
    });
  }
}
