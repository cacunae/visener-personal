import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AscProgramComponent } from './asc-program.component';

describe('AscProgramComponent', () => {
  let component: AscProgramComponent;
  let fixture: ComponentFixture<AscProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AscProgramComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AscProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
