import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyTogglePrototypeComponent } from './hy-toggle-prototype.component';

describe('HyTogglePrototypeComponent', () => {
  let component: HyTogglePrototypeComponent;
  let fixture: ComponentFixture<HyTogglePrototypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyTogglePrototypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyTogglePrototypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
