import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyToggleComponent } from './hy-toggle.component';

describe('HyToggleComponent', () => {
  let component: HyToggleComponent;
  let fixture: ComponentFixture<HyToggleComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
