import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AclService } from '../service/acl.service';

@Directive({
  selector: '[acl]'
})
export class AclDirective implements OnDestroy {
  aclId: string;
  isHere: boolean = false;
  uuid: string;

  @Input() set acl(AclId) {
    if (AclId) this.aclId = AclId;
    if (this.aclService.getAcl(AclId) || this.aclService.isAdmin) {
      this.createView();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private aclService: AclService
  ) { }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    this.uuid = this.getUuid();
    this.aclService.obj['fn' + this.aclId + this.uuid] = () => {
      if (this.aclService.getAcl(this.aclId) || this.aclService.isAdmin) {
        this.createView();
      } else {
        this.viewContainerRef.clear();
        this.isHere = false;
      }
    }
  }

  // 获取随机码
  getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  // 创建视图
  createView() {
    if (this.isHere) return;
    this.viewContainerRef.createEmbeddedView(this.templateRef);
    this.isHere = true;
  }

  // 销毁方法
  ngOnDestroy() {
    delete this.aclService.obj['fn' + this.aclId + this.uuid];
  }
}
