import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyCheckboxComponent } from './hy-checkbox.component';

describe('HyCheckboxComponent', () => {
  let component: HyCheckboxComponent;
  let fixture: ComponentFixture<HyCheckboxComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyCheckboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
