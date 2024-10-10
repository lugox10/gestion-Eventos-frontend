import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoFormularioComponent } from './evento-formulario.component';

describe('EventoFormularioComponent', () => {
  let component: EventoFormularioComponent;
  let fixture: ComponentFixture<EventoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventoFormularioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
