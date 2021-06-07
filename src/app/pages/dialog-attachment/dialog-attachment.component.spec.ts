import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogAttachmentComponent } from './dialog-attachment.component';

describe('DialogAttachmentComponent', () => {
  let component: DialogAttachmentComponent;
  let fixture: ComponentFixture<DialogAttachmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
