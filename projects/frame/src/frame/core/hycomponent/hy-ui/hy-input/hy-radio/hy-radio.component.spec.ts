import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyRadioComponent } from './hy-radio.component';

describe('HyRadioComponent', () => {
  let component: HyRadioComponent;
  let fixture: ComponentFixture<HyRadioComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyRadioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
