import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerificacionService {
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined';
  }

  getId() {
    if (this.isBrowser) {
      return sessionStorage.getItem("id");
    }
    else {
      return null;
    }
  }

  setId(id: string) {
    if (this.isBrowser) {
      sessionStorage.setItem("id", id);
    }
  }

  getNombre() {
    if (this.isBrowser) {
      return sessionStorage.getItem("nombre");
    }
    else {
      return null;
    }
  }

  setNombre(nombre: string) {
    if (this.isBrowser) {
      sessionStorage.setItem("nombre", nombre);
    }
  }
}