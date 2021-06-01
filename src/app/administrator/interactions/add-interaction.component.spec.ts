import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInteractionComponent } from './add-interaction.component';

describe('AddInteractionComponent', () => {
  let component: AddInteractionComponent;
  let fixture: ComponentFixture<AddInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInteractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
