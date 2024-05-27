import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-confirmacion-estado',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmacion-estado.component.html',
  styleUrl: './confirmacion-estado.component.scss'
})
export class ConfirmacionEstadoComponent {

}
