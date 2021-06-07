import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddRelationComponent } from './dialog-add-relation.component';

describe('DialogAddRelationComponent', () => {
  let component: DialogAddRelationComponent;
  let fixture: ComponentFixture<DialogAddRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
