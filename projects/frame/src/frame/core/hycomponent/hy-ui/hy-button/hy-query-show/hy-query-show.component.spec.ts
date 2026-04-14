import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyQueryShowComponent } from './hy-query-show.component';

describe('HyQueryShowComponent', () => {
  let component: HyQueryShowComponent;
  let fixture: ComponentFixture<HyQueryShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyQueryShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyQueryShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
