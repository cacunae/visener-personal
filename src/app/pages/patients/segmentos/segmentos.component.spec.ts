import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentosComponent } from './segmentos.component';

describe('SegmentosComponent', () => {
  let component: SegmentosComponent;
  let fixture: ComponentFixture<SegmentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
