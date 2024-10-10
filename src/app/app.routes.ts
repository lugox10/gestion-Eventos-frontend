import { Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {EventoFormularioComponent} from './evento-formulario/evento-formulario.component';
import {AppComponent} from './app.component';

export const routes: Routes = [

  {
    path: 'home/',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'formulario/:id',
    component: EventoFormularioComponent,
    title: 'pagina de formulario'
  },
  {
    path: 'bienvenido/',
    component: AppComponent,
    title: 'Pagina de inicio'
  }





];
