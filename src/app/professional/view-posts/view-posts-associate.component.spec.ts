import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostsAssociateComponent } from './view-posts-associate.component';

describe('ViewPostsAssociateComponent', () => {
  let component: ViewPostsAssociateComponent;
  let fixture: ComponentFixture<ViewPostsAssociateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPostsAssociateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostsAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
