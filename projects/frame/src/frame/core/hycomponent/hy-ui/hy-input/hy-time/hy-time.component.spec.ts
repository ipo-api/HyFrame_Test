import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyTimeComponent } from './hy-time.component';

describe('HyTimeComponent', () => {
  let component: HyTimeComponent;
  let fixture: ComponentFixture<HyTimeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
