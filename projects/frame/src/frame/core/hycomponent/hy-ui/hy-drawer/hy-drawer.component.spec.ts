import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyDrawerComponent } from './hy-drawer.component';

describe('HyDrawerComponent', () => {
  let component: HyDrawerComponent;
  let fixture: ComponentFixture<HyDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
