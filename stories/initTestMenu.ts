import { AppGlobal } from "projects/frame/src/public-api";
export class InitTestMenu {
  static init() {
    //初始化菜单
    //menuId：  01-49 由 应用使用  50-94由 框架使用  95-99由 测试使用
    AppGlobal.menu = AppGlobal.menu || [];

    AppGlobal.dicService.push({
      name: "testShowPwd",
      value: [{text: "不显示临时密码", id: "1"}],
    });

    AppGlobal.dicService.push({
      name: "testAllowLogin",
      value: [
        {text: "允许登录", id: "1"},
        {text: "不允许登录，但要求马上修改密", id: "2"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testHour",
      value: [
        {text: "00:00", id: "1"},
        {text: "01:00", id: "2"},
        {text: "02:00", id: "3"},
        {text: "11:00", id: "4"},
        {text: "08:00", id: "5"},
        {text: "10:00", id: "6"},
        {text: "22:00", id: "7"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testPost",
      value: [
        {text: "前端开发", id: "1"},
        {text: "后端开发", id: "2"},
        {text: "产品经理", id: "3"},
        {text: "客服", id: "4"},
        {text: "老大", id: "0"},
        {text: "null", id: "100"},
      ],
    });


    AppGlobal.dicService.push({
      name: "testWeek", //星期
      value: [
        {text: "星期一", id: "1"},
        {text: "星期二", id: "2"},
        {text: "星期三", id: "3"},
        {text: "星期四", id: "4"},
        {text: "星期五", id: "5"},
        {text: "星期六", id: "6"},
        {text: "星期日", id: "7"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testTimeType", //星期
      value: [
        {text: "月", id: "1"},
        {text: "周", id: "2"},
        {text: "日", id: "3"},
      ],
    });

    const children: string[] = [];
    for (let i = 1; i <= 10000; i++) {
      children.push(`${i.toString()}`);
    }
    const bigDataValue = children.map(item => ({
      id: item + '',
      text: 'test'+item
    }));
    AppGlobal.dicService.push({
      name: "bigData", //星期
      value:bigDataValue,
    })

    AppGlobal.dicService.push({
      name: "testValue",
      value: [
        {text: "新增用户/组", id: "1"},
        {text: "编辑用户/组", id: "2"},
        {text: "用户/组权限指派", id: "3"},
        {text: "删除用户/组", id: "4"},
        {text: "控制面板", id: "6"},
        {text: "切换用户状态", id: "8"},
        {text: "审计", id: "9"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testLogin",
      // "value": [{label: '星期一', value: "星期一"}, {label: '星期二', value: "星期二"}, {label: '星期三', value: "星期三"},{label: 'adc', value: "adc"}, {label: '测试数据', value: "测试数据"}]
      value: [
        {text: "查询", id: "1"},
        {text: "新增", id: "2"},
        {text: "编辑", id: "3"},
        {text: "删除", id: "4"},
        {text: "查看会话记录", id: "5"},
        {text: "查看会话记录", id: "6"},
        {text: "查看会话记录", id: "7"},
        {text: "查看会话记录", id: "8"},
        {text: "查看会话记录", id: "9"},
        {text: "查看会话记录", id: "10"},
        {text: "查看会话记录", id: "11"},
        {text: "查看会话记录", id: "12"},
        {text: "查看会话记录", id: "13"},
        {text: "查看会话记录", id: "14"},
        {text: "查看会话记录", id: "15"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testSucessFail",
      value: [
        {text: "成功", id: "1"},
        {text: "失败", id: "2"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testAcctQueryCheckbox",
      // "value": [{label: '星期一', value: "星期一"}, {label: '星期二', value: "星期二"}, {label: '星期三', value: "星期三"},{label: 'adc', value: "adc"}, {label: '测试数据', value: "测试数据"}]
      value: [
        {text: "显示被分享", id: "1"},
        {text: "只查询已删除", id: "2"},
      ],
    });
    AppGlobal.dicService.push({
      name: "testTaskType",

      value: [
        {text: "账号日志查询", id: "1"},
        {text: "密码箱日志查询", id: "2"},
      ],
    });
    AppGlobal.dicService.push({
      name: "testQueryType",
      value: [
        {text: "全部节点", id: "1"},
        {text: "单个节点", id: "2"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testOpenClose",
      value: [
        {text: "关闭", id: "0"},
        {text: "开启", id: "1"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testConnPluginRelate",
      value: [
        {text: "大写字母", id: "1"},
        {text: "小写字母", id: "2"},
        {text: "数字", id: "3"},
        {text: "符号", id: "4"},
      ],
    });


    AppGlobal.dicService.push({
      name: "testRadio",
      // "value": [{label: '星期一', value: "星期一"}, {label: '星期二', value: "星期二"}, {label: '星期三', value: "星期三"},{label: 'adc', value: "adc"}, {label: '测试数据', value: "测试数据"}]
      value: [
        {text: "只显示被分享", id: "1"},
        {text: "只显示已删除", id: "2"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testTimeV",
      // "value": [{label: '星期一', value: "星期一"}, {label: '星期二', value: "星期二"}, {label: '星期三', value: "星期三"},{label: 'adc', value: "adc"}, {label: '测试数据', value: "测试数据"}]
      value: [
        {text: "实时", id: "1"},
        {text: "定时", id: "2"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testSafeRights",
      value: [
        {text: "编辑", id: "1"},
        {text: "删除", id: "2"},
        {text: "查看成员", id: "3"},
        {text: "指派", id: "4"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testAdress",
      value: [
        {text: "172.168.12.61", id: "1"},
        {text: "172.168.12.62", id: "2"},
        {text: "172.168.12.63", id: "3"},
        {text: "172.168.12.64", id: "4"},
        {text: "172.168.12.65", id: "5"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testName",
      value: [
        {text: " CyberArk特权系统软件维保服务合同_hy100057", id: "9"},
        {text: "特权插件开发_hy100021", id: "1"},
        {text: "动态数据脱敏插件开发_hy100023", id: "2"},
        {text: "特权账号安全管理项目一期_hy100025", id: "3"},
        {text: "厦门国际银行动态数据脱敏项目_hy100035", id: "4"},
        {text: "2018年湖南联通特权账号项目_hy100036", id: "5"},
        {text: "广东联通特权账号及数据脱敏采购合同 _hy100044", id: "6"},
        {text: "风光电场网络安全改造试点项目_hy100048", id: "7"},
        {text: "特权系统一期_hy100033", id: "8"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testDoing",
      value: [
        {text: "学习汇报", id: "1"},
        {text: "学习研究", id: "2"},
        {text: "数据统计收集", id: "3"},
        {text: "技术探索", id: "4"},
        {text: "插件开发", id: "5"},
        {text: "系统实施", id: "6"},
        {text: "项目启动", id: "7"},
        {text: "售后服务", id: "8"},
        {text: " 其他（评估，技术支持）", id: "9"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testStaus",
      value: [
        {text: "指派人未指派", id: "1"},
        {text: "创建人未指派", id: "2"},
        {text: "任务进行中", id: "3"},
        {text: "任务待指派", id: "4"},
        {text: "任务未指派", id: "5"},
        {text: "申请延期中", id: "6"},
        {text: "已确认", id: "7"},
      ],
    });

    AppGlobal.dicService.push({
      name: "testMan",
      value: [
        {text: "张晓", id: "1"},
        {text: "李玉坤", id: "2"},
        {text: "王帅", id: "3"},
        {text: "罗玉进", id: "4"},
        {text: "周岚清", id: "5"},
        {text: "罗志祥", id: "6"},
        {text: "王毅刚", id: "7"},
      ],
    });

    AppGlobal.menu.push(
      ...[
        {
          name: "测试页面",
          module: "特权分析",
          menuId: "01",
          menuImg: "accesscontrol.png",
          level: 1,
          children: [
            {
              name: "垂直分布",
              menuId: "0101",
              url: "/main/best/vertical",
              level: 2,
            },
            {
              name: "4个搜索条件的布局",
              menuId: "0104",
              url: "/main/best/four",
              level: 2,
            },
            {
              name: "多个搜索条件的布局",
              menuId: "0199",
              url: "/main/best/many",
              level: 2,
            },
            {
              name: "经典场景",
              menuId: "0187",
              url: "/main/best/classicSceneUI/mainPage",
              level: 2,
            },
          ],
        },
        {
          name: "通用设置",
          module: "通用设置",
          menuId: "01",
          menuImg: "account.png",
          level: 1,
        },
        {
          name: "database特权分析",
          module: "database特权分析",
          menuId: "02",
          menuImg: "node.png",
          level: 1,
          children: [
            {
              name: "扫描分析",
              menuId: "0201",
              url: "/main/database/search",
              level: 2,
            },
            {
              name: "联动处理",

              menuId: "0204",
              url: "/main/database/handle",
              level: 2,
            },
            {
              name: "设置",
              menuId: "0299",
              url: "/main/database/setup/main",
              level: 2,
            },
          ],
        },
        {
          name: "操作系统特权分析操作系统特权分析",
          module: "os特权分析",
          menuId: "03",
          menuImg: "audit.png",
          level: 1,
          children: [
            {
              name: "扫描分析",

              menuId: "0301",
              url: "/main/os/search",
              level: 2,
            },
            {
              name: "联动处理",

              menuId: "0304",
              url: "/main/os/handle",
              level: 2,
            },
            {
              name: "设置",

              menuId: "0399",
              url: "/main/os/setup/sort/query/0",
              level: 2,
            },
          ],
        },
        {
          name: "系统配置",
          module: "系统配置",
          menuId: "65",
          level: 1,
          menuImg: "conversation.png",
          children: [
            {
              name: "PAS连接信息",
              menuId: "6501",
              url: "/main/setup/global",
              level: 2,
            },
          ],
        },
        {
          name: "Demo测试",
          module: "Demo测试",
          menuId: "67",
          level: 1,
          menuImg: "set.png",
          children: [
            {
              name: "按钮",
              menuId: "6701",
              url: "/main/compataTest/compentAll/compent-botton-testModleOne",
              level: 2,
            },
          ],
        },
        {
          name: "组件测试页面",
          module: "组件测试页面",
          menuId: "68",
          level: 1,
          menuImg: "node.png",
          children: [
            {
              name: "海颐基本text海颐基本text海颐基本text海颐基本text",
              menuId: "6801",
              url: "/main/compataTest/compentAll/compent-testModleOne",
              level: 2,
            },
          ],
        },

        {
          name: "部分组件",
          module: "部分组件",
          menuId: "18",
          level: 1,
          menuImg: "node.png",
          children: [
            {
              name: "导航栏",
              level: 2,
              menuId: "1801",
              url: "/main/compataTwo/compentAll/compent-nav-list",
            },
            {
              name: "横向tab选项卡横向tab选项卡",
              level: 2,
              menuId: "1802",
              url: "/main/compataTwo/compentAll/compent-htab-list",
            },
            {
              name: "按钮",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/toggle-button",
            },
            {
              name: "锚点移动",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/compent-move-list",
            },
            {
              name: "下拉树",
              level: 2,
              menuId: "1804",
              url: "/main/compataTwo/compentAll/select-tree",
            },
            {
              name: "日历",
              level: 2,
              menuId: "1805",
              url: "/main/compataTwo/compentAll/compent-time",
            },
            {
              name: "测试页面",
              level: 2,
              menuId: "1806",
              url: "/main/compataTwo/compentAll/compent-testModleOne-list",
            },
            {
              name: "有问题的",
              level: 2,
              menuId: "1807",
              url: "/main/compataTwo/compentAll/acct-add",
            },
          ],
        },

        {
          name: "个人信息",
          module: "部分组件",
          menuId: "18",
          level: 1,
          menuImg: "node.png",
          children: [
            {
              name: "导航栏",
              level: 2,
              menuId: "1801",
              url: "/main/compataTwo/compentAll/compent-nav-list",
            },
            {
              name: "横向tab选项卡横向tab选项卡",
              level: 2,
              menuId: "1802",
              url: "/main/compataTwo/compentAll/compent-htab-list",
            },
            {
              name: "按钮",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/toggle-button",
            },
            {
              name: "锚点移动",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/compent-move-list",
            },
            {
              name: "下拉树",
              level: 2,
              menuId: "1804",
              url: "/main/compataTwo/compentAll/select-tree",
            },
            {
              name: "日历",
              level: 2,
              menuId: "1805",
              url: "/main/compataTwo/compentAll/compent-time",
            },
            {
              name: "测试页面",
              level: 2,
              menuId: "1806",
              url: "/main/compataTwo/compentAll/compent-testModleOne-list",
            },
            {
              name: "有问题的",
              level: 2,
              menuId: "1807",
              url: "/main/compataTwo/compentAll/acct-add",
            },
          ],
        },

        {
          name: "部分组件",
          module: "部分组件",
          menuId: "18",
          menuImg: "node.png",
          level: 1,
          children: [
            {
              name: "导航栏",
              level: 2,
              menuId: "1801",
              url: "/main/compataTwo/compentAll/compent-nav-list",
            },
            {
              name: "横向tab选项卡横向tab选项卡",
              level: 2,
              menuId: "1802",
              url: "/main/compataTwo/compentAll/compent-htab-list",
            },
            {
              name: "按钮",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/toggle-button",
            },
            {
              name: "锚点移动",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/compent-move-list",
            },
            {
              name: "下拉树",
              level: 2,
              menuId: "1804",
              url: "/main/compataTwo/compentAll/select-tree",
            },
            {
              name: "日历",
              level: 2,
              menuId: "1805",
              url: "/main/compataTwo/compentAll/compent-time",
            },
            {
              name: "测试页面",
              level: 2,
              menuId: "1806",
              url: "/main/compataTwo/compentAll/compent-testModleOne-list",
            },
            {
              name: "有问题的",
              level: 2,
              menuId: "1807",
              url: "/main/compataTwo/compentAll/acct-add",
            },
            {
              name: "导航栏",
              level: 2,
              menuId: "1801",
              url: "/main/compataTwo/compentAll/compent-nav-list",
            },
            {
              name: "横向tab选项卡横向tab选项卡",
              level: 2,
              menuId: "1802",
              url: "/main/compataTwo/compentAll/compent-htab-list",
            },
            {
              name: "按钮",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/toggle-button",
            },
            {
              name: "锚点移动",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/compent-move-list",
            },
            {
              name: "下拉树",
              level: 2,
              menuId: "1804",
              url: "/main/compataTwo/compentAll/select-tree",
            },
            {
              name: "日历",
              level: 2,
              menuId: "1805",
              url: "/main/compataTwo/compentAll/compent-time",
            },
            {
              name: "测试页面",
              level: 2,
              menuId: "1806",
              url: "/main/compataTwo/compentAll/compent-testModleOne-list",
            },
            {
              name: "有问题的",
              level: 2,
              menuId: "1807",
              url: "/main/compataTwo/compentAll/acct-add",
            },
            {
              name: "导航栏",
              level: 2,
              menuId: "1801",
              url: "/main/compataTwo/compentAll/compent-nav-list",
            },
            {
              name: "横向tab选项卡横向tab选项卡",
              level: 2,
              menuId: "1802",
              url: "/main/compataTwo/compentAll/compent-htab-list",
            },
            {
              name: "按钮",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/toggle-button",
            },
            {
              name: "锚点移动",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/compent-move-list",
            },
            {
              name: "下拉树",
              level: 2,
              menuId: "1804",
              url: "/main/compataTwo/compentAll/select-tree",
            },
            {
              name: "日历",
              level: 2,
              menuId: "1805",
              url: "/main/compataTwo/compentAll/compent-time",
            },
            {
              name: "测试页面",
              level: 2,
              menuId: "1806",
              url: "/main/compataTwo/compentAll/compent-testModleOne-list",
            },
            {
              name: "有问题的",
              level: 2,
              menuId: "1807",
              url: "/main/compataTwo/compentAll/acct-add",
            },
            {
              name: "导航栏",
              level: 2,
              menuId: "1801",
              url: "/main/compataTwo/compentAll/compent-nav-list",
            },
            {
              name: "横向tab选项卡横向tab选项卡",
              level: 2,
              menuId: "1802",
              url: "/main/compataTwo/compentAll/compent-htab-list",
            },
            {
              name: "按钮",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/toggle-button",
            },
            {
              name: "锚点移动",
              level: 2,
              menuId: "1803",
              url: "/main/compataTwo/compentAll/compent-move-list",
            },
            {
              name: "下拉树",
              level: 2,
              menuId: "1804",
              url: "/main/compataTwo/compentAll/select-tree",
            },
            {
              name: "日历",
              level: 2,
              menuId: "1805",
              url: "/main/compataTwo/compentAll/compent-time",
            },
            {
              name: "测试页面",
              level: 2,
              menuId: "1806",
              url: "/main/compataTwo/compentAll/compent-testModleOne-list",
            },
            {
              name: "有问题的",
              level: 2,
              menuId: "1807",
              url: "/main/compataTwo/compentAll/acct-add",
            },
          ],
        },
      ]
    );
  }
}
