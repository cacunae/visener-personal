import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssociatedPatientsComponent } from './asc-patients.component';

describe('AssociatedPatientsComponent', () => {
  let component: AssociatedPatientsComponent;
  let fixture: ComponentFixture<AssociatedPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatedPatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
