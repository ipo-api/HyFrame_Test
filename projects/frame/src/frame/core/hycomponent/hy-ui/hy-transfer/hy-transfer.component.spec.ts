import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyTransferComponent } from './hy-transfer.component';

describe('HyTransferComponent', () => {
  let component: HyTransferComponent;
  let fixture: ComponentFixture<HyTransferComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
