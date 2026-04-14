import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyTreeSelectComponent } from './hy-tree-select.component';

describe('HyTreeSelectComponent', () => {
  let component: HyTreeSelectComponent;
  let fixture: ComponentFixture<HyTreeSelectComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyTreeSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
