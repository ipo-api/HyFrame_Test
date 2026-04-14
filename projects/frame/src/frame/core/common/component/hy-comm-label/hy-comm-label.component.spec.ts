import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HyCommLabelComponent } from './hy-comm-label.component';

describe('HyCommLabelComponent', () => {
  let component: HyCommLabelComponent;
  let fixture: ComponentFixture<HyCommLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HyCommLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HyCommLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
