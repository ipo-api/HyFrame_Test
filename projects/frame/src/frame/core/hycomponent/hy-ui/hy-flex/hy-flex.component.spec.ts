import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyFlexComponent } from './hy-flex.component';

describe('HyFlexComponent', () => {
  let component: HyFlexComponent;
  let fixture: ComponentFixture<HyFlexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyFlexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyFlexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
