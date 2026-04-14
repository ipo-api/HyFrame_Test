import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyCheckboxDetailComponent } from './hy-checkbox-detail.component';

describe('HyCheckboxDetailComponent', () => {
  let component: HyCheckboxDetailComponent;
  let fixture: ComponentFixture<HyCheckboxDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyCheckboxDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyCheckboxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
