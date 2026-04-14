import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HyLinebreakComponent} from './hy-linebreak.component';

describe('HyLinebreakComponent', () => {
  let component: HyLinebreakComponent;
  let fixture: ComponentFixture<HyLinebreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HyLinebreakComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyLinebreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
