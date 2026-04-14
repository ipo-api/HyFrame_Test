import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyAlertComponent } from './hy-alert.component';

describe('HyAlertComponent', () => {
  let component: HyAlertComponent;
  let fixture: ComponentFixture<HyAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
