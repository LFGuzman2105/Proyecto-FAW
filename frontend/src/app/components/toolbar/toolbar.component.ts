import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { VerificacionService } from '../../services/verificacion.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  id: string;
  nombre: string;

  constructor(private router: Router, private verificacionService: VerificacionService) {
    this.id = this.router.url.split('/')[2];

    if (this.verificacionService.getNombre() == null) {
      this.nombre = "";
    }
    else {
      this.nombre = this.verificacionService.getNombre() + "";
    }
  }

  logout() {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("nombre");
    this.router.navigate(['/login']);
  }

  navegarAgregarTarea() {
    this.router.navigate(['/agregarTarea/' + this.id]);
  }

  navegarListado() {
    this.router.navigate(['/listado/' + this.id]);
  }
}