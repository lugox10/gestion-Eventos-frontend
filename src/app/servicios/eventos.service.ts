import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:8787/iasapi/eventos';

  constructor(private http: HttpClient) { }

  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}`);
  }

  getEventoByTipoEvento(tipoEvento: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.apiUrl}/${tipoEvento}`);
  }

  // Corregido: Utilizamos FormData para crear el evento y enviar la imagen
  createEvento(evento: Evento, image: File): Observable<Evento> {
    const formData = new FormData();
    formData.append('evento', new Blob([JSON.stringify(evento)], { type: 'application/json' }));  // Añade los datos del evento en formato JSON
    formData.append('file', image);  // Añade el archivo de imagen

    return this.http.post<Evento>(`${this.apiUrl}`, formData);  // Envía los datos usando FormData
  }

  updateEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${evento.id}`, evento);
  }

  deleteEvento(id: number): Observable<Evento> {
    return this.http.delete<Evento>(`${this.apiUrl}/${id}`);
  }

  // Actualización de la imagen de un evento
  updateEventoImage(id: number, image: File): Observable<Evento> {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.put<Evento>(`${this.apiUrl}/${id}/image`, formData);
  }
}
