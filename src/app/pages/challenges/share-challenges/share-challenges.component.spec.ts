import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareChallengesComponent } from './share-challenges.component';

describe('ShareChallengesComponent', () => {
  let component: ShareChallengesComponent;
  let fixture: ComponentFixture<ShareChallengesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareChallengesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
