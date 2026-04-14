import {fakeAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HyProgressComponent} from './hy-progress.component';

describe('HyProgressComponent', () => {
  let component: HyProgressComponent;
  let fixture: ComponentFixture<HyProgressComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HyProgressComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HyProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
