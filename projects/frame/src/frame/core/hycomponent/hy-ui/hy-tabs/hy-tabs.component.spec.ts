import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyTabsComponent } from './hy-tabs.component';

describe('HyTabsComponent', () => {
  let component: HyTabsComponent;
  let fixture: ComponentFixture<HyTabsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
