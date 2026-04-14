import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyDateComponent } from './hy-date.component';

describe('HyDateComponent', () => {
  let component: HyDateComponent;
  let fixture: ComponentFixture<HyDateComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
