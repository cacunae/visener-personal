import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTerapeuticoComponent } from './plan-terapeutico.component';

describe('PlanTerapeuticoComponent', () => {
  let component: PlanTerapeuticoComponent;
  let fixture: ComponentFixture<PlanTerapeuticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanTerapeuticoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanTerapeuticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
