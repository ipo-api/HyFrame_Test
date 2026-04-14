import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyListComponent } from './hy-list.component';

describe('HyListComponent', () => {
  let component: HyListComponent;
  let fixture: ComponentFixture<HyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
