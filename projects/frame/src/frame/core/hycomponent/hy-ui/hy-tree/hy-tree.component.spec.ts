import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyTreeComponent } from './hy-tree.component';

describe('HyTreeComponent', () => {
  let component: HyTreeComponent;
  let fixture: ComponentFixture<HyTreeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyTreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
