import { Component } from '@angular/core';
import { TareaService } from '../../services/tarea.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { VerificacionService } from '../../services/verificacion.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmacionEstadoComponent } from '../confirmacion-estado/confirmacion-estado.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [HttpClientModule, ToolbarComponent, MatExpansionModule, MatIconModule, MatButtonModule, 
            MatDialogModule, MatInputModule, MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.scss',
  providers: [TareaService]
})
export class ListadoComponent {
  private id: number;
  tareas: any[];
  panelOpenState: boolean;
  buscar: string;
  prioridad: string;
  filtroAZ: string;
  verificacion: boolean;

  constructor(private tareaService: TareaService, private router: Router, 
              private verificacionService: VerificacionService, public dialog: MatDialog) {
    this.id = parseInt(this.router.url.split('/')[2]);
    this.tareas = [];
    this.panelOpenState = false;
    this.buscar = "";
    this.prioridad = "";
    this.filtroAZ = "ASC";
    this.verificacion = false;
    
    try {
      if (this.id + "" == this.verificacionService.getId()){
        this.verificacion = true;
        this.mostrarTareas();
      }
      else {
        alert("No tienes permiso para acceder a esta página");
        this.router.navigate(['/login']);
      }
    }
    catch (error) { }
  }

  mostrarTareas() { 
    this.tareaService.getTareas(this.id).subscribe((response) => {
      if (response.status == 1) {
        this.tareas = response.data;
      }
    }); 
  }
    

  actualizarEstado(id: number) {
    const dialogRef = this.dialog.open(ConfirmacionEstadoComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tareaService.updateEstado(id).subscribe((response) => { });
        this.mostrarTareas();
      }
    });
  }

  mostrarFiltro(filtroAZ: string) {
    this.tareaService.filtrarTareas(this.id, this.buscar, this.prioridad, filtroAZ).subscribe((response) => {
      if (response.status == 1) {
        this.tareas = response.data;
      }
      else if (response.status == 0) {
        this.tareas = [];
      }
    });
  }

  filtrar() {
    if (this.buscar == "" && this.prioridad == "") {
      this.mostrarTareas();
    }
    else {
      this.mostrarFiltro("");
    }
  }

  filtrarAZ() {
    if (this.filtroAZ == "ASC") {
      this.mostrarFiltro(this.filtroAZ);
      this.filtroAZ = "DESC";
    }
    else {
      this.mostrarFiltro(this.filtroAZ);
      this.filtroAZ = "ASC";
    }
  }

  convertirFecha(fecha: string) {
    fecha = fecha.split('T')[0];
    return fecha;
  }

  contarDias(fecha: string) {
    let fecha_actual = new Date().toISOString().split('T')[0];
    let fecha_creacion = new Date(fecha);
    let dias = Math.ceil((Date.parse(fecha_actual) - Date.parse(fecha_creacion.toISOString().split('T')[0])) / 86400000) - 1;
    
    if (dias == 0) {
      return "Hoy";
    }
    else if (dias == 1) {
      return "Ayer";
    }
    else if (dias == -1) {
      return "Hoy";
    }
    else {
      return "hace " + dias + " días";
    }
  }
}