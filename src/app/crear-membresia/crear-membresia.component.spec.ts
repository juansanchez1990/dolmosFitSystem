import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMembresiaComponent } from './crear-membresia.component';

describe('CrearMembresiaComponent', () => {
  let component: CrearMembresiaComponent;
  let fixture: ComponentFixture<CrearMembresiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMembresiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMembresiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
