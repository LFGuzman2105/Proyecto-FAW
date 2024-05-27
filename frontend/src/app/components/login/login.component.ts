import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { VerificacionService } from '../../services/verificacion.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, 
    ReactiveFormsModule, MatIconModule, MatButtonModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService]
})
export class LoginComponent {
  email: FormControl;
  errorMessage: string;
  hide: boolean;
  contrasena: string;
  datos: any;
  
  constructor(private loginService: LoginService, private router: Router, private verificacionService: VerificacionService) { 
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.errorMessage = '';
    this.hide = true;
    this.contrasena = '';
    this.datos = [];

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

  login() {
    if (this.email.invalid || this.contrasena == "") {
      alert("Debe ingresar un correo electrónico y una contraseña.");
    }
    else {
      this.loginService.login(this.email.value, this.contrasena).subscribe(
        (response) => {
          if (response.status == 1) {
            this.verificacionService.setId(response.data[0].id);
            this.verificacionService.setNombre(response.data[0].Nombre);

            this.router.navigate(['/listado/' + response.data[0].id]);
          }
          else {
            alert(response.mensaje);
          }
        }
      );
    }
  }
}