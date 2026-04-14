import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, TemplateRef} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { HyTextComponent } from './hy-text.component';
import { HyFormService } from '../../../../common/domain/service/hyform.service';
import {TableService} from '../../../../common/domain/service/hytable.service';
import {ModelService} from '../../../../common/domain/service/model.service';
import {DicService} from '../../../../service/dic.service';


describe('HyTextComponent', () => {
  let component: HyTextComponent;
  let fixture: ComponentFixture<HyTextComponent>;
  let modelService;
  let formService;
  let tableService;
  let el;
  let fb;
  let renderer2;
  let dicService;
  let modelName;
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HyTextComponent ],
      // providers:[{ provide: ModelService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    modelService = TestBed.inject(ModelService);
    fb = TestBed.inject(FormBuilder);
    el = TestBed.inject(ElementRef);
    formService = TestBed.inject(HyFormService);
    tableService = TestBed.inject(TableService);
    renderer2 = TestBed.inject(Renderer2);
    dicService = TestBed.inject(DicService);
    modelName = 'test';
  }));

  it('should compile', () => {
    tableService['modelName'] = 'test';
    expect(component).toBeTruthy();
  });

  it('should set #modelService[tableService.modelName][modelName] to "testttt"',()=>{
    // const comp = new HyTextComponent(formService,tableService, modelService,el,fb,renderer2,dicService);
  })
});
