import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyCellBtnGroupComponent } from './hy-cell-btn-group.component';

describe('HyCellBtnGroupComponent', () => {
  let component: HyCellBtnGroupComponent;
  let fixture: ComponentFixture<HyCellBtnGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyCellBtnGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyCellBtnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
