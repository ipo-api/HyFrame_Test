import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyCellBtnComponent } from './hy-cell-btn.component';

describe('HyCellBtnComponent', () => {
  let component: HyCellBtnComponent;
  let fixture: ComponentFixture<HyCellBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyCellBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyCellBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
