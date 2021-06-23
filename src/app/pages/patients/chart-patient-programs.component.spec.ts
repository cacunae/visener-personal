import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPatientProgramsComponent } from './chart-patient-programs.component';

describe('ChartPatientProgramsComponent', () => {
  let component: ChartPatientProgramsComponent;
  let fixture: ComponentFixture<ChartPatientProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartPatientProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartPatientProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
