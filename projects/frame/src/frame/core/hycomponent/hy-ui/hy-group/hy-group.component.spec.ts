import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyGroupComponent } from './hy-group.component';

describe('HyGroupComponent', () => {
  let component: HyGroupComponent;
  let fixture: ComponentFixture<HyGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
