# hyFullscreen 全屏指令

## 概述
`hyFullscreen` 是一个用于实现元素全屏显示的指令。该指令可以将指定的元素切换到全屏模式，并提供全屏状态的监听和背景色设置功能。

## 基本用法
```html
<div hyFullscreen 
     [hyFullscreenValid]="isFullscreen" 
     (hyFullscreenValidChange)="onFullscreenChange($event)">
  <!-- 需要全屏显示的内容 -->
</div>
```

## 属性说明

### 输入属性 (Input)

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `hyFullscreenValid` | `boolean` | `false` | 控制全屏状态，设置为 `true` 时进入全屏模式 |
| `hyFullscreenBackgroundColor` | `string` | `'#f0f2f5'` | 全屏模式下的背景颜色 |

### 输出事件 (Output)

| 事件名 | 类型 | 说明 |
|--------|------|------|
| `hyFullscreenValidChange` | `EventEmitter<boolean>` | 全屏状态发生变化时触发，返回当前全屏状态 |

## 使用场景

### 1. 图片/视频全屏查看
适用于需要全屏查看图片、视频等媒体内容的场景。

### 2. 数据展示全屏
适用于图表、报表等需要全屏展示以获得更好视觉效果的场景。

### 3. 文档/编辑器全屏
适用于文档编辑器、代码编辑器等需要沉浸式编辑体验的场景。

## 注意事项

1. **浏览器兼容性**: 全屏 API 需要用户手势触发，不能在页面加载时自动全屏
2. **样式处理**: 进入全屏时会自动添加 `hy-fullscreen` CSS 类，可用于自定义全屏样式
3. **退出全屏**: 用户可通过 ESC 键或浏览器控件退出全屏，指令会自动监听并更新状态
4. **背景色恢复**: 退出全屏时会自动恢复元素原有的背景色

## CSS 样式

指令会在全屏时为元素添加 `hy-fullscreen` 类，可以通过 CSS 自定义全屏样式：

```css
.hy-fullscreen {
  /* 全屏时的自定义样式 */
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
```

## 完整示例

```html
<div class="content-container">
  <button (click)="toggleFullscreen()">
    {{ isFullscreen ? '退出全屏' : '进入全屏' }}
  </button>
  
  <div hyFullscreen 
       [hyFullscreenValid]="isFullscreen"
       [hyFullscreenBackgroundColor]="backgroundColor"
       (hyFullscreenValidChange)="onFullscreenChange($event)"
       class="fullscreen-content">
    <h2>全屏内容</h2>
    <p>这里是需要全屏显示的内容...</p>
  </div>
</div>
```

```typescript
export class ExampleComponent {
  isFullscreen = false;
  backgroundColor = '#ffffff';

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  onFullscreenChange(isFullscreen: boolean) {
    this.isFullscreen = isFullscreen;
    console.log('全屏状态变化:', isFullscreen);
  }
}
```
