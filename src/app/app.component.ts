import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,ButtonModule,CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestionEventos-frontend';
}
