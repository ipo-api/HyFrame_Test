import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyTextareaComponent } from './hy-textarea.component';

describe('HyTextareaComponent', () => {
  let component: HyTextareaComponent;
  let fixture: ComponentFixture<HyTextareaComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyTextareaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
