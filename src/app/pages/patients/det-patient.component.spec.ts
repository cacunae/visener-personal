import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetPatientComponent } from './det-patient.component';

describe('DetPatientComponent', () => {
  let component: DetPatientComponent;
  let fixture: ComponentFixture<DetPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
