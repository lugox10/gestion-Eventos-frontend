import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { EventosService } from '../servicios/eventos.service';
import { ActivatedRoute, Router, RouterModule} from '@angular/router';
import { MessageService } from 'primeng/api';
import {FileSelectEvent, FileUploadModule} from 'primeng/fileupload';
import { Evento } from '../models/evento';
import {DropdownModule} from 'primeng/dropdown';
import {CardModule} from 'primeng/card';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';


@Component({
  selector: 'app-evento-formulario',
  templateUrl: './evento-formulario.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    RouterModule,
    InputTextModule,
    InputNumberModule,
    CardModule,
    FileUploadModule,DropdownModule
  ],
  styleUrls: ['./evento-formulario.component.css']
})
export class EventoFormularioComponent {

  EventoFormulario!: FormGroup;
  isSaveInProgress: boolean = false;
  edit: boolean = false;
  selectedFile: File | null = null;


  tipoEvento: any[] = [
    { label: 'Bautizo', value: 'Bautizo' },
    { label: 'Primera Comunión', value: 'Primera Comunión' },
    { label: 'Confirmación', value: 'Confirmación' },
    { label: 'Matrimonio', value: 'Matrimonio' },
    { label: 'Fiesta Infantil', value: 'Fiesta Infantil' },
    { label: 'Fiesta Empresarial', value: 'Fiesta Empresarial' },
    { label: 'Fiesta Familiar', value: 'Fiesta Familiar' },
    { label: 'Fiesta de Quince', value: 'Fiesta de Quince' },
    { label: 'Fiesta de Graduación', value: 'Fiesta de Graduación' },
    { label: 'Fiesta de Aniversario', value: 'Fiesta de Aniversario' },
    { label: 'Fiesta de Despedida Soltero', value: 'Fiesta de Despedida Soltero' }
  ];
  constructor(private fb: FormBuilder,
              private EventosService: EventosService,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private router: Router) {
    this.EventoFormulario = this.fb.group({
      id: [null],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      lugar: ['', Validators.required],
      tipoEvento: ['', Validators.required],
      descripcion: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== 'new') {
      this.edit = true;
      this.getEventoByTipoEvento(+id!);
    }
  }

  onSubmit(): void {
    if (this.edit) {
      this.updateEvento(this.EventoFormulario.value);
    } else {
      this.createEvento(this.EventoFormulario.value);
    }
  }

  onFileSelected(event: FileSelectEvent) {
    this.selectedFile = event.files[0];
  }

  getEventoByTipoEvento(id: number) {
    this.EventosService.getEventoByTipoEvento(id).subscribe({
      next: (foundEvento: { [key: string]: any }) => {
        this.EventoFormulario.patchValue(foundEvento);
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al obtener el evento' });
        this.router.navigateByUrl('/');
      },
    });
  }

  createEvento(evento: Evento) {
    if (this.EventoFormulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    if (!this.selectedFile) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Seleccione una imagen e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.EventosService
      .createEvento(evento, this.selectedFile)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Guardado',
            detail: 'Evento guardado correctamente',
          });
          this.isSaveInProgress = false;
          this.router.navigateByUrl('/');
        },
        error: () => {
          this.isSaveInProgress = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Revise los campos e intente nuevamente',
          });
        },
      });
  }

  updateEvento(evento: Evento) {
    if (this.EventoFormulario.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Revise los campos e intente nuevamente',
      });
      return;
    }
    this.isSaveInProgress = true;
    this.EventosService.updateEvento(this.EventoFormulario.value).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Guardado',
          detail: 'Evento actualizado correctamente',
        });
        this.isSaveInProgress = false;
        this.router.navigateByUrl('/');
      },
      error: () => {
        this.isSaveInProgress = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Revise los campos e intente nuevamente',
        });
      },
    });
  }

}
