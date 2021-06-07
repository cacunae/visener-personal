import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogInteractionComponent } from './dialog-interaction.component';

describe('DialogComponent', () => {
  let component: DialogInteractionComponent;
  let fixture: ComponentFixture<DialogInteractionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
