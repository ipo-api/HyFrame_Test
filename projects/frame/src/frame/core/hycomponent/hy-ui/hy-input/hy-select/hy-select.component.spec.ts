import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HySelectComponent } from './hy-select.component';

describe('HySelectComponent', () => {
  let component: HySelectComponent;
  let fixture: ComponentFixture<HySelectComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HySelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
