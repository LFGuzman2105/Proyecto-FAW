import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

type tareaResponse = {
  status: number;
  mensaje: string;
  data: any[];
};

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private APP_DOMAIN: string;
  private headers: HttpHeaders;

  constructor(private http: HttpClient) { 
    this.APP_DOMAIN = 'http://localhost:3000';
    this.headers = new HttpHeaders({'Content-Type': 'application/json'});
  }

  getTareas(id: number) {
    return this.http.get<tareaResponse>(`${this.APP_DOMAIN}/listado/` + id, {headers: this.headers});
  }

  updateEstado(id: number) {
    return this.http.put<tareaResponse>(`${this.APP_DOMAIN}/listado/` + id, {headers: this.headers, id});
  }

  insertTarea(titulo: string, prioridad: string, descripcion: string, fecha_creacion: string, id: number, estatus: string) {
    return this.http.post<tareaResponse>(`${this.APP_DOMAIN}/agregarTarea/` + id, {headers: this.headers, titulo, prioridad, 
      descripcion, fecha_creacion, estatus});
  }

  filtrarTareas(id: number, buscar: string, prioridad: string, filtroAZ: string) {
    return this.http.post<tareaResponse>(`${this.APP_DOMAIN}/listado/` + id, {headers: this.headers, buscar, prioridad, filtroAZ});
  }
}
