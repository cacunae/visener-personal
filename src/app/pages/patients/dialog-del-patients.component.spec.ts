import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDelPatientsComponent } from './dialog-del-patients.component';

describe('DialogDelPatientsComponent', () => {
  let component: DialogDelPatientsComponent;
  let fixture: ComponentFixture<DialogDelPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDelPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDelPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
