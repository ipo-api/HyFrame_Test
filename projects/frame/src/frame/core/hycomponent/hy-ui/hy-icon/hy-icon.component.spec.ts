import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyIconComponent } from './hy-icon.component';

describe('HyIconComponent', () => {
  let component: HyIconComponent;
  let fixture: ComponentFixture<HyIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
