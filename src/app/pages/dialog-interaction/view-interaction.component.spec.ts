import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInteractionComponent } from './view-interaction.component';

describe('ViewInteractionComponent', () => {
  let component: ViewInteractionComponent;
  let fixture: ComponentFixture<ViewInteractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInteractionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
