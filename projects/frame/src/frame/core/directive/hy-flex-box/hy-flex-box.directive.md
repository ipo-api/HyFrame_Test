# hyFlexBox 指令使用说明

## 基本说明

hyFlexBox 指令是参照 CSS 原生布局 flex 实现的弹性布局指令。flex 的核心是**按比例布局**，当父级使用了 hyFlexBox 的情况下，子级标签可以使用相关属性进行灵活布局。

## 父级容器属性

### hyFlexBoxDirection
- **类型**: `'column' | 'row'`
- **默认值**: `'row'`
- **说明**: 布局模式，column为纵向布局，row为横向布局

```html
<!-- 横向布局（默认） -->
<div hyFlexBox hyFlexBoxDirection="row">
  <div hyFlex="1">内容1</div>
  <div hyFlex="1">内容2</div>
</div>

<!-- 纵向布局 -->
<div hyFlexBox hyFlexBoxDirection="column">
  <div hyFlex="1">内容1</div>
  <div hyFlex="1">内容2</div>
</div>
```

### hyFlexBoxCenter
- **类型**: `'center' | 'space-between' | 'space-evenly' | 'space-around' | 'flex-end' | 'flex-start'`
- **说明**: 
  - 当 `hyFlexBoxDirection='row'` 时，控制子元素的【水平】对齐方式
  - 当 `hyFlexBoxDirection='column'` 时，控制子元素的【垂直】对齐方式

```html
<!-- 居中对齐 -->
<div hyFlexBox hyFlexBoxCenter="center">
  <div>内容1</div>
  <div>内容2</div>
</div>

<!-- 两端对齐 -->
<div hyFlexBox hyFlexBoxCenter="space-between">
  <div>内容1</div>
  <div>内容2</div>
</div>
```

### hyFlexBoxAlignItems
- **类型**: `'center' | 'flex-end' | 'flex-start'`
- **说明**: 
  - 当 `hyFlexBoxDirection='row'` 时，控制子元素的【垂直】对齐方式
  - 当 `hyFlexBoxDirection='column'` 时，控制子元素的【水平】对齐方式

```html
<!-- 垂直居中 -->
<div hyFlexBox hyFlexBoxAlignItems="center">
  <div>内容1</div>
  <div>内容2</div>
</div>
```

### hyFlexBoxGap
- **类型**: `string`
- **说明**: 子元素之间的间隙，单位为px

```html
<!-- 设置10px间隙 -->
<div hyFlexBox hyFlexBoxGap="10px">
  <div hyFlex="1">内容1</div>
  <div hyFlex="1">内容2</div>
</div>
```

## 子元素属性

### hyFlex
- **类型**: `string`
- **说明**: 设置flex比例，按比例分配剩余空间

```html
<div hyFlexBox>
  <div hyFlex="1">占比1</div>
  <div hyFlex="2">占比2</div>
  <div hyFlex="1">占比1</div>
</div>
<!-- 如果父级宽度是400px，则三个div的宽度分别是100px、200px、100px -->
```

### hyWidth / hyHeight
- **类型**: `string`
- **说明**: 设置固定宽度或高度

```html
<div hyFlexBox>
  <div hyWidth="100px">固定宽度100px</div>
  <div hyFlex="1">占剩余空间</div>
</div>

<div hyFlexBox hyFlexBoxDirection="column">
  <div hyHeight="50px">固定高度50px</div>
  <div hyFlex="1">占剩余空间</div>
</div>
```

### hyRight
- **类型**: `string`
- **说明**: 设置右对齐，会自动设置flex="1"和text-align="right"，可选择性设置右边距

```html
<div hyFlexBox>
  <div>左侧内容</div>
  <div hyRight>右对齐内容</div>
</div>

<div hyFlexBox>
  <div>左侧内容</div>
  <div hyRight="20px">右对齐内容（右边距20px）</div>
</div>
```

## 综合使用示例

```html
<!-- 完整的导航栏布局 -->
<div hyFlexBox 
     hyFlexBoxDirection="row" 
     hyFlexBoxCenter="space-between" 
     hyFlexBoxAlignItems="center"
     hyFlexBoxGap="10px">
  <div hyWidth="200px">Logo区域</div>
  <div hyFlex="1">导航菜单</div>
  <div hyRight="20px">用户信息</div>
</div>

<!-- 垂直布局的侧边栏 -->
<div hyFlexBox 
     hyFlexBoxDirection="column" 
     hyFlexBoxGap="5px">
  <div hyHeight="60px">头部</div>
  <div hyFlex="1">内容区域</div>
  <div hyHeight="40px">底部</div>
</div>
```

## 注意事项

1. hyFlexBox 必须作用于父级容器上
2. 子元素属性需要作为HTML属性设置，不是Angular输入属性
3. 当设置了 hyFlexBoxGap 时，指令会自动处理容器的尺寸和子元素的边距
4. 使用 hyRight 属性时，元素会自动获得 flex="1" 和右对齐样式