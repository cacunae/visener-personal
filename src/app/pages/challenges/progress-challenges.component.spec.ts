import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressChallengesComponent } from './progress-challenges.component';

describe('ProgressChallengesComponent', () => {
  let component: ProgressChallengesComponent;
  let fixture: ComponentFixture<ProgressChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressChallengesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
