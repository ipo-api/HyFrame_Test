import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HybSelectComponent } from './hyb-select.component';

describe('HybSelectComponent', () => {
  let component: HybSelectComponent;
  let fixture: ComponentFixture<HybSelectComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HybSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HybSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
