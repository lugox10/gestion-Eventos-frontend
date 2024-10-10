import {Component} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {CardModule} from 'primeng/card';
import {EventosService} from '../servicios/eventos.service';
import {Evento} from '../models/evento';
import {RouterModule} from '@angular/router';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  Evento: Evento[] = [];
  isDeleteInProgress: boolean = false;
  constructor(
    private EventosService: EventosService,
    private messageService: MessageService
  ) {}


  ngOnInit(): void {

  }

  getEventos() {
    this.EventosService.getEventos().subscribe((data) => {
      this.Evento = data;
    });
  }

  deleteEvento(id: number) {
    this.isDeleteInProgress = true;
    this.EventosService.deleteEvento(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Correcto',
          detail: 'Evento eliminado',
        });
        this.isDeleteInProgress = false;
        this.getEventos();
      },
      error: () => {
        this.isDeleteInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo eliminar el evento',
        });
      },
    });
  }
}
