import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HyAlignComponent} from './hy-align.component';

describe('HyAlignComponent', () => {
  let component: HyAlignComponent;
  let fixture: ComponentFixture<HyAlignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HyAlignComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyAlignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
