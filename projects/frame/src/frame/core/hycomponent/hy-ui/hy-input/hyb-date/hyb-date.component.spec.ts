import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HybDateComponent } from './hyb-date.component';

describe('HybDateComponent', () => {
  let component: HybDateComponent;
  let fixture: ComponentFixture<HybDateComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HybDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HybDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
