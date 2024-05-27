import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListadoComponent } from './components/listado/listado.component';
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { AgregarTareaComponent } from './components/agregar-tarea/agregar-tarea.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'listado/:usuario', component: ListadoComponent },
    { path: 'registroUsuario', component: RegistroUsuarioComponent },
    { path: 'agregarTarea/:usuario', component: AgregarTareaComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full'},
    { path: '**', redirectTo: '/login'}
];