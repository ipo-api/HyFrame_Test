import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AclService {
  private aclList: string[] = [];
  public isAdmin: boolean = false;
  public obj: object = {};

  constructor() { }

  // 设置权限列表，存入缓存
  setAclList(aclList:Array<any>) {
    this.aclList = aclList;
    window.sessionStorage.setItem('aclList', JSON.stringify(this.aclList));
    this.runAclFn();
  }

  // 获取权限列表
  getAclList() {
    return JSON.parse(window.sessionStorage.getItem('aclList')) || [];
  }

  // 获取超级管理员
  getIsAdmin() {
    return JSON.parse(window.sessionStorage.getItem('isAdmin')) || false;
  }

  // 重置权限
  resetAcl() {
    window.sessionStorage.removeItem('aclList');
    window.sessionStorage.removeItem('isAdmin');
    this.aclList = [];
    this.isAdmin = false;
  }

  // 初始化权限控制
  initAcl() {
    const aclList = this.getAclList();
    const isAdmin = this.getIsAdmin();
    if(isAdmin){
      this.isAdmin = isAdmin;
    }
    if (!isAdmin && aclList.length > 0) {
      this.aclList = aclList;
    }
  }

  // 获取权限
  getAcl(AclId) {
    if (this.aclList && this.aclList.length > 0) {
      return this.aclList.findIndex(item => item === AclId) !== -1;
    } else {
      return false;
    }
  }

  // 设置超级管理员
  setIsAdmin(isAdmin:boolean) {
    this.isAdmin = isAdmin;
    window.sessionStorage.setItem('isAdmin',isAdmin.toString());
    this.runAclFn();
  }

  // 执行触发方法
  runAclFn() {
    if(!this.obj) return;
    for(let key in this.obj){
      this.obj[key]();
    }
  }
}
