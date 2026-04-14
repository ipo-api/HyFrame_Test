import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HySliderComponent } from './hy-slider.component';

describe('HySliderComponent', () => {
  let component: HySliderComponent;
  let fixture: ComponentFixture<HySliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HySliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HySliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
