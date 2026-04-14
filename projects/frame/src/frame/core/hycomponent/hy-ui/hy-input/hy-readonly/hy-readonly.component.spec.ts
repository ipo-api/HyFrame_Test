import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyReadonlyComponent } from './hy-readonly.component';

describe('HyReadonlyComponent', () => {
  let component: HyReadonlyComponent;
  let fixture: ComponentFixture<HyReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
