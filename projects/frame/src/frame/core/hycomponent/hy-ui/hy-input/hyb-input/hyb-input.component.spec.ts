import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HybInputComponent } from './hyb-input.component';

describe('HybInputComponent', () => {
  let component: HybInputComponent;
  let fixture: ComponentFixture<HybInputComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HybInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HybInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
