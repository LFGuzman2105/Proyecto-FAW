import { Component } from '@angular/core';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { TareaService } from '../../services/tarea.service';
import { VerificacionService } from '../../services/verificacion.service';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-agregar-tarea',
  standalone: true,
  imports: [ToolbarComponent, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, 
            MatButtonModule, MatDatepickerModule, HttpClientModule, MatSelectModule],
  templateUrl: './agregar-tarea.component.html',
  styleUrl: './agregar-tarea.component.scss',
  providers: [TareaService]
})
export class AgregarTareaComponent {
  titulo: string;
  descripcion: string;
  fecha_creacion: string;
  prioridad: string;
  id: number;

  constructor(private tareaService: TareaService, private verificacionService: VerificacionService, private router: Router,
              private snackBar: MatSnackBar) { 
    this.titulo = '';
    this.descripcion = '';
    this.fecha_creacion = new Date().toISOString().split('T')[0];
    this.prioridad = '';
    this.id = parseInt(this.router.url.split('/')[2]);

    try {
      if (this.id + "" != this.verificacionService.getId()){
        alert("No tienes permiso para acceder a esta página");
        this.router.navigate(['/login']);
      }
    }
    catch (error) { }
  }

  crear() {
    if (this.titulo == "" || this.descripcion == "" || this.prioridad == "") {
      alert("Debe ingresar todos los campos.");
    }
    else {
      this.tareaService.insertTarea(this.titulo, this.prioridad, this.descripcion, this.fecha_creacion, 
                                    this.id, "ACTIVA").subscribe(
        (response) => {
          if (response.status == 1) {
            this.titulo = '';
            this.descripcion = '';
            this.prioridad = '';
            this.snackBar.open(response.mensaje, 'Cerrar', {duration: 5000});
          }
          else {
            alert(response.mensaje);
          }
        }
      );
    }
  }
}