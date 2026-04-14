import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HyUploadComponent } from './hy-upload.component';

describe('HyUploadComponent', () => {
  let component: HyUploadComponent;
  let fixture: ComponentFixture<HyUploadComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
