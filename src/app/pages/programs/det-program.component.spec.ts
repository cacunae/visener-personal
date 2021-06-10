import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetProgramComponent } from './det-program.component';

describe('DetProgramComponent', () => {
  let component: DetProgramComponent;
  let fixture: ComponentFixture<DetProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
