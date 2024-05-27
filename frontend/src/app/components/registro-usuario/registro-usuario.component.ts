import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule, 
    MatDatepickerModule, MatRadioModule, RouterModule, HttpClientModule],
  templateUrl: './registro-usuario.component.html',
  styleUrl: './registro-usuario.component.scss',
  providers: [provideNativeDateAdapter(), UsuarioService]
})
export class RegistroUsuarioComponent {
  email: FormControl;
  errorMessage: string;
  hide: boolean;
  contrasena: string;
  nombres: string;
  apellidos: string;
  genero: string;
  fecha_nacimiento: string;

  constructor(private usuarioService: UsuarioService, private snackBar: MatSnackBar) { 
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.errorMessage = '';
    this.hide = true;
    this.contrasena = '';
    this.nombres = '';
    this.apellidos = '';
    this.genero = '';
    this.fecha_nacimiento = '';

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage = 'Debe ingresar un correo electrónico.';
    } 
    else if (this.email.hasError('email')) {
      this.errorMessage = 'No es un correo electrónico válido.';
    } 
    else {
      this.errorMessage = '';
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  limpiar() {
    this.email.reset();
  }

  registrar() {
    if (this.email.invalid || this.contrasena == "" || this.nombres == "" || this.apellidos == "" || this.genero == "" || this.fecha_nacimiento == "") {
      alert("Debe ingresar todos los campos.");
    }
    else {
      this.usuarioService.crearUsuario(this.email.value, this.nombres + " " + this.apellidos, this.fecha_nacimiento, this.contrasena, this.genero).subscribe(
        (response) => {
          if (response.status == 1) {
            this.limpiar();
            this.nombres = '';
            this.apellidos = '';
            this.fecha_nacimiento = '';
            this.contrasena = '';
            this.genero = '';
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