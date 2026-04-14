import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyMenuComponent } from './hy-menu.component';

describe('HyMenuComponent', () => {
  let component: HyMenuComponent;
  let fixture: ComponentFixture<HyMenuComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
