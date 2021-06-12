import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogProgramComponent } from './dialog-program.component';

describe('DialogProgramComponent', () => {
  let component: DialogProgramComponent;
  let fixture: ComponentFixture<DialogProgramComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
