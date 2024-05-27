import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

type usuarioResponse = {
  mensaje: string;
  status: number;
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private APP_DOMAIN: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.APP_DOMAIN = 'http://localhost:3000';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  crearUsuario(email: string, nombres: string, fecha_nacimiento: string, contrasena: string, genero: string) {
    return this.http.post<usuarioResponse>(`${this.APP_DOMAIN}/registroUsuario`, {headers: this.headers, email, nombres, fecha_nacimiento, contrasena, genero});
  }
}