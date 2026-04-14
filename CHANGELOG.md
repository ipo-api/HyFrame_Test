# 📦 更新日志

## 🚀 Version 4.7.1 _(2025-12-08)_

### ✨ 新增功能
- `AppGlobal` 新增登录超时后记录的当前页的字段：`authTimeoutRoute`

### 🛠️ 修复
- 修复 `hy-glt` 跨页多选在火狐浏览器下功能异常
- 修复 `hy-edit-table` 样式异常
- 修复 `hy-group` 样式问题、操作按钮样式未对齐及 `maxRow` 属性无效问题
- 修复 `hy-readonly` 字典模式下无输出及火狐浏览器下映射模式样式异常
- 修复 `hy-text` 属性报错
- 修复 `hy-transfer` 内部报错
- 修复 `hy-btn-layout` 内部报错

### 🔧 变更
- `hy-icon` 还原元素属性
- `hyDic`指令修改使用方式：
    - 原用法：‘dd_xxxx’ | hyDic:  '1'  | async
    - 现用法：‘dd_xxxx’ | hyDic:  '1'

---

## 🚀 Version 4.7.0 _(2025-11-12)_

### ✨ 新增功能
- 新增 `hy-group` 指令，用于解决 `hyGroupTh` 无法使用国际化问题;
- `hy-group` 新增 `noOperation` 属性，类型：`boolean`，默认值：`false`，说明：是否隐藏操作按钮

### 🛠️ 修复
- `hy-group` 操作按钮提示未国际化

---

## 🚀 Version 4.6.0 _(2025-11-11)_

### ✨ 新增功能
- `hy-glt` 新增属性 `heightLightName`，类型：`string`，说明：自定义字段名称，默认字段名称为 `_heightLight`
- `hy-button` 新增映射方式

### 🛠️ 修复
- `hy-select` 在大数据场景下，字典数据变动时报错
- `hy-select` 样式异常
- `hy-form` 在嵌套组件场景下样式被清空问题
- 可编辑记录表在 `td` 动态循环场景下使用 `editRow` 报错
- 可编辑记录表跨页全选后反选样式问题

### 🔧 变更
- `hy-glt` 无总数分页样式调整
- `hy-radio` 并排样式优化
- `hy-edit-table` 方法名称修正：`eidtRow` → `editRow`

---

## 🚀 Version 4.5.0 _(2025-10-11)_

### ✨ 新增功能
- 新增全屏指令（支持页面内容一键全屏显示）
- `hy-upload` 新增 `multiple` 属性，支持选择多个文件

### 🛠️ 修复
- 修复若干拼写错误，提升一致性与可读性

### 🔧 变更
- `hy-readonly` 移除无用代码，优化体积与可维护性

---

## 🚀 Version 4.4.1 _(2024-01-08)_

### ✨ 新增功能
- `hy-transfer` 新增必录校验

### 🛠️ 修复
- 修复特殊场景下，部分提示没有国际化
- 修复 `hy-select` 设置 `cols` 无效问题
- 修复 `hy-select` 使用 `disableTime` 属性时，没有国际化
- 修复 `hy-select` 对 `gt` 上的 `cols` 无响应问题
- 修复调用 `StaticResourceService.getResource` 控制台报错问题
- 修复 `hy-upload` 部分翻译失效问题
- 修复 `hy-treeSelect` 样式问题，修复 `hy-treeSelect` 查询数据后，重新打开下拉窗口，数据展示异常问题
- 修复弹窗标题输入特殊字符导致渲染为标签的问题
- 修复 `hy-button` 边距样式问题

### 🔧 变更
- `zen_sec_fields` 修改为 `zen-sec-fields`
- 优化logo展示逻辑
- 优化tip提示与glt表头单词换行支持
- `hy-select`、`hy-date`、`hyb-select`、`hy-treeSelect` 调整英文placeholder默认文本
- 优化交互效果

---

## 🚀 Version 4.4.0 _(2025-08-15)_

### ✨ 新增功能
- `hy-gt` 以及 `gt` 内部使用的组件，新增 `isLabelWrap` 属性，类型 `boolean`，默认值：`false`，说明：标题超出长度时是否允许换行
- `hy-radio` 新增属性 `isEllipsis`，类型：`boolean`，默认值：`false`，说明：超出长度是否显示省略号，默认不显示省略号并换行（仅 `type=radio` 时生效）
- `hyapi.post` 新增上传文件功能（配合 `hy-upload` 的 `fileList` 双向绑定使用）
- `hy-upload` 新增属性 `fileList`，支持双向绑定，返回选中的文件列表
- `HyApiPostOpt` 类型新增 `fileList` 与 `isFileEncrypt` 属性
- `hy-group` 新增 `hyGroupTh` 表头用法（在子组件标签上写 `hyGroupTh="标题"`）
- `hy-group` 新增 `maxRow` 最大行数（当设置为 1 时，不显示右侧操作栏）
- `hy-glt` 新增高度自适应功能
- `hy-readonly` 新增映射功能
- 新增 `hyDic` 管道

### 🛠️ 修复
- `hy-radio` 修复 `type` 为 `radio`，并且限制了每行数量（`onelineNum`）的时候，字符超长会导致样式异常
- `hy-glt` 修复本地分页时使用排序的交互错误
- `hy-align` 修复样式错误
- `hy-gt`、`hy-form` 修复变量名拼写错误（将 `formVaild` 更正为 `formValid`）
- `hy-tree` 修复右键弹窗消失后未还原其他元素样式
- `hy-title` 修复布局异常
- `hy-flex-box` 修复同时使用 `hyFlex` 和 `hyFlexBox` 时样式异常

### 🔧 变更
- 还原 http 请求合并功能：相同 url、相同条件的重复请求将自动合并（替代“操作频繁”提示）
- `hy-flex-box` 指令属性统一为 `hyFlexBox*` 命名（如 `hyDirection` 更名为 `hyFlexBoxDirection`）
- `hy-button` 优化样式
- 移除冗余打印日志

---

## 🚀 Version 4.3.3 _(2025-06-27)_

### 🛠️ 修复
- `hy-glt` 修复跨页全选模式下刷新功能异常
- `hy-glt`、`hy-edit-table` 使用 `post` 刷新后页面无变化

---

## 🚀 Version 4.3.2 _(2025-05-30)_

### ✨ 新增功能
- 抽屉新增媒体流适配
- 新增解密 demo

### 🛠️ 修复
- 修复国际化可能翻译错误

### 🔧 变更
- 调整 `hy-radio` 样式

---

## 🚀 Version 4.3.1 _(2025-05-19)_

### 🛠️ 修复
- 修复 `hy-upload` 翻译错误
- 修复 `hy-text` 提示词不触发问题

---

## 🚀 Version 4.3.0 _(2025-05-12)_

### 🔧 变更
- 版本号调整为 4.3.0

---

## 🚀 Version 4.2.1 _(2025-05-12)_

### ✨ 新增功能
- `hy-upload` 新增属性 `maxUploadCount`（类型：number，默认值：null），说明：设置后将限制可上传文件的最大数量

### 🛠️ 修复
- 修复 `hy-glt`、`hy-edit-table` 报错问题
- 修复 `hy-radio` 未主动触发字典数据变动问题
- 修复 `hy-select` 等携带弹窗的组件弹窗后样式错误问题

---

## 🚀 Version 4.2.0 _(2025-04-24)_

### ✨ 新增功能
- `hy-text` 新增提示选项功能，属性：`promptOptions`，类型：`HyDicValue[]`，说明：提示选项，用于下拉框，设置参数后将默认使用提示选项；若设置了 `promptFilterFn`，将使用过滤后的选项
- 新增 storybook 文档文件（完善组件示例与 API 说明）
- 调整 Angular 版本至 `13.3.11`

### 🛠️ 修复
- `hy-edit-table` 修复新增或者编辑时无响应问题
- `hy-readonly` 修复高度异常问题
- `hy-form` 表单验证：修复首次进行表单验证时可能失效问题

---

## 🚀 Version 4.1.35 _(2025-03-19)_

### ✨ 新增功能
- `hy-upload` 支持多文件上传
- `hy-upload` 新增属性 `totalSize`（类型：number | string），说明：限制上传文件总大小；`number` 类型的默认单位为 KB；`string` 类型需自行输入单位，如 `5MB` 或 `500KB`（单位仅支持 KB 和 MB）
- `hy-upload` 新增回调 `onBeforeUploadPrepare`（说明：点击上传按钮，上传前的事件）
- `hy-cell-btn-group` 的 `HyCellBtnGroupBtnArray` 新增 `iconClass`，可修改图标样式

### 🔧 变更
- 移除 `hy-upload` 的 `onBeforeUpload` 回调
- `hy-glt` 固定列用法优化：在 `hy-cell` 中使用 `nzLeft`/`nzRight` = `true` 即可，固定宽度由框架内部计算
- 优化表单验证，多个错误同时出现时的分隔样式

---

## 🚀 Version 4.1.34 _(2025-01-21)_

### ✨ 新增功能
- `hy-tree` 用法优化：当 `expandLevel` 设置为 `-1` 时，树展开根据开发人员传入数据中的 `expanded` 字段决定

### 🛠️ 修复
- `hy-glt` 修复“暂无数据”的繁体翻译不一致问题（可能出现“無此資料”或“暫無數據”）

---

## 🚀 Version 4.1.33 _(2024-12-17)_

### 🛠️ 修复
- 维护更新与修复

---

## 🚀 Version 4.1.32 _(2024-09-05)_

### 🛠️ 修复
- 维护更新与修复

---

## 🚀 Version 4.1.31 _(2024-08-01)_

### 🛠️ 修复
- 维护更新与修复

---

## 🚀 Version 4.1.30 _(2024-07-25)_

### 🛠️ 修复
- 维护更新与修复

---

## 🚀 Version 4.1.29 _(2024-07-02)_

### 🛠️ 修复
- 维护更新与修复

---

## 🚀 Version 4.1.28 _(2024-05-31)_

### 🛠️ 修复
- 维护更新与修复

---

## 🚀 Version 4.1.27 _(2024-05-11)_

### ✨ 新增功能
- `$hyapi.post` 新增 `loadingMsg`，说明：加载提示信息
- `hy-date` 新增属性 `renderExtraFooter`，类型：`TemplateRef<any> | string | (() => TemplateRef<any> | string)`，说明：页脚模板
- `hy-glt` 新增跨页多选

### 🛠️ 修复
- `hy-tabs` 修复多级路由嵌套时，标签定位错误
- `hy-glt` 修复无数据时无表头问题
- `hy-glt` 修复跨页多选样式问题
- 合并 4.1.22–4.1.26-beta 阶段的稳定性修复

### 🔧 变更
- 修改spreadCheckedData类型为object[]

---

## 🚀 Version 4.1.26-beta _(2023-XX-XX)_

### 🛠️ 修复
- Beta版本功能修复
（说明：本beta版本提交记录已汇总到 4.1.27 正式版）

---

## 🚀 Version 4.1.25-beta _(2023-XX-XX)_

### 🛠️ 修复
- Beta版本功能修复
（说明：本beta版本提交记录已汇总到 4.1.27 正式版）

---

## 🚀 Version 4.1.24-beta _(2023-XX-XX)_

### 🛠️ 修复
- Beta版本功能修复
（说明：本beta版本提交记录已汇总到 4.1.27 正式版）

---

## 🚀 Version 4.1.23-beta _(2023-XX-XX)_

### 🛠️ 修复
- Beta版本功能修复
（说明：本beta版本提交记录已汇总到 4.1.27 正式版）

---

## 🚀 Version 4.1.22-beta _(2023-XX-XX)_

### 🛠️ 修复
- Beta版本功能修复
（说明：本beta版本提交记录已汇总到 4.1.27 正式版）

---

## 🚀 Version 4.1.21-beta _(2023-XX-XX)_

### ✨ 新增功能
- 新增storybook文件
- 修改angular版本号为13.3.11

### 🛠️ 修复
- Beta版本功能修复
（说明：本beta版本提交记录已汇总到 4.2.0 正式版）