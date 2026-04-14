import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyNumberComponent } from './hy-number.component';

describe('HyNumberComponent', () => {
  let component: HyNumberComponent;
  let fixture: ComponentFixture<HyNumberComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
