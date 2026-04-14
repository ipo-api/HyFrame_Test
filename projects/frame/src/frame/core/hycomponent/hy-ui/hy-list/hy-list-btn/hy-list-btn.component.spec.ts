import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyListBtnComponent } from './hy-list-btn.component';

describe('HyListBtnComponent', () => {
  let component: HyListBtnComponent;
  let fixture: ComponentFixture<HyListBtnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyListBtnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyListBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
