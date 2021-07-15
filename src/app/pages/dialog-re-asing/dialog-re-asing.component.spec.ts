import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReAsingComponent } from './dialog-re-asing.component';

describe('DialogReAsingComponent', () => {
  let component: DialogReAsingComponent;
  let fixture: ComponentFixture<DialogReAsingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogReAsingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReAsingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
