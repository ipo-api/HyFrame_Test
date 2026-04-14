import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyButtonComponent } from './hy-button.component';

describe('HyButtonComponent', () => {
  let component: HyButtonComponent;
  let fixture: ComponentFixture<HyButtonComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
