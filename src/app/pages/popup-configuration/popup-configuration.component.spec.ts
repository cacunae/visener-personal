import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupConfigurationComponent } from './popup-configuration.component';

describe('PopupConfigurationComponent', () => {
  let component: PopupConfigurationComponent;
  let fixture: ComponentFixture<PopupConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupConfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
