import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HyDropdownButtonComponent} from './hy-dropdown-button.component';

describe('HyDropdownButtonComponent', () => {
  let component: HyDropdownButtonComponent;
  let fixture: ComponentFixture<HyDropdownButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HyDropdownButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyDropdownButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
