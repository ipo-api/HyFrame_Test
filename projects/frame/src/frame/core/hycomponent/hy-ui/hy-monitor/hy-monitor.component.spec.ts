import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyMonitorComponent } from './hy-monitor.component';

describe('HyMonitorComponent', () => {
  let component: HyMonitorComponent;
  let fixture: ComponentFixture<HyMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
