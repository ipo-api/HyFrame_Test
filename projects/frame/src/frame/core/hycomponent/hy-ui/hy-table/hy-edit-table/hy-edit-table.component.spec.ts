import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyEditTableComponent } from './hy-edit-table.component';

describe('HyEditTableComponent', () => {
  let component: HyEditTableComponent;
  let fixture: ComponentFixture<HyEditTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyEditTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyEditTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
