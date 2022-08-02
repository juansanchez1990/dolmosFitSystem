import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPesosComponent } from './chart-pesos.component';

describe('ChartPesosComponent', () => {
  let component: ChartPesosComponent;
  let fixture: ComponentFixture<ChartPesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
