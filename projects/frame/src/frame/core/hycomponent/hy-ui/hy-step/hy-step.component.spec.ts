import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyStepComponent } from './hy-step.component';

describe('HyStepComponent', () => {
  let component: HyStepComponent;
  let fixture: ComponentFixture<HyStepComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyStepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
