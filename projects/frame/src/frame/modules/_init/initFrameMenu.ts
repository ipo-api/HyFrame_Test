import {AppGlobal} from '../../config/AppGlobal';
export class InitFrameMenu {
  static init() {
    //初始化菜单
    //menuId：  01-49 由 应用使用  50-94由 框架使用  95-99由 测试使用
    AppGlobal.menu = AppGlobal.menu || [];
    AppGlobal.menu.push(
      ...[
        {
          name: 'frameMenu.权限管理',
          module: 'frameMenu.权限管理',
          menuId: '66',
          menuImg: 'authority.png',
          level: 1,
          children: [
            {
              name: 'frameMenu.用户管理',
              menuId: '6601',
              url: '/main/rbac/user',
              level: 2,
            },
            {
              name: 'frameMenu.角色管理',
              menuId: '6602',
              url: '/main/rbac/role',
              level: 2,
            },
          ],
        },
      ]
    );
  }
}
