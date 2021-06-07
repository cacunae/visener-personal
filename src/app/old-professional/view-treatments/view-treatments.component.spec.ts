import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTreatmentsComponent } from './view-treatments.component';

describe('ViewTreatmentsComponent', () => {
  let component: ViewTreatmentsComponent;
  let fixture: ComponentFixture<ViewTreatmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTreatmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
