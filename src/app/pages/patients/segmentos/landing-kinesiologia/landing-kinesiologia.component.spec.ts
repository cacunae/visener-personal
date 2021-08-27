import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingKinesiologiaComponent } from './landing-kinesiologia.component';

describe('LandingKinesiologiaComponent', () => {
  let component: LandingKinesiologiaComponent;
  let fixture: ComponentFixture<LandingKinesiologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingKinesiologiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingKinesiologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
