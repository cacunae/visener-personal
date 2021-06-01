import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WeblogComponent } from './weblog.component';

describe('WeblogComponent', () => {
  let component: WeblogComponent;
  let fixture: ComponentFixture<WeblogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WeblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
