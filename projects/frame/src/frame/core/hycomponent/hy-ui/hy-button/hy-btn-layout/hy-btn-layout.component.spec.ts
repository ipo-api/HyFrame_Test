import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyBtnlayoutComponent } from './hy-btn-layout.component';

describe('HyBtnLayoutComponent', () => {
  let component: HyBtnlayoutComponent;
  let fixture: ComponentFixture<HyBtnlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyBtnlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyBtnlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
