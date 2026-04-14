import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyGltComponent } from './hy-glt.component';

describe('HyGltComponent', () => {
  let component: HyGltComponent;
  let fixture: ComponentFixture<HyGltComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyGltComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyGltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
