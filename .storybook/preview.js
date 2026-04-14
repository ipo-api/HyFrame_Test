import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import { addons } from '@storybook/addons';

// 引入 hy-frame-pro 主题样式
import '../node_modules/hy-frame-pro/styles/themes/style.purple.css';
import '../node_modules/hy-frame-pro/styles/themes/style.light.css';
import '../node_modules/hy-frame-pro/styles/themes/style.dark.css';

setCompodocJson(docJson);

// 初始化：从 URL 或 Storybook globals 获取当前语言
function initializeLocale() {
  // 方式1: 从 URL 参数中读取 globals
  const urlParams = new URLSearchParams(window.location.search);
  const globalsParam = urlParams.get('globals');
  
  if (globalsParam) {
    // Storybook 6.x 使用 key:value 格式，如 "globals=locale:zh"
    const localeMatch = globalsParam.match(/locale:([^,]+)/);
    if (localeMatch) {
      window.__STORYBOOK_CURRENT_LOCALE__ = localeMatch[1];
      return;
    }
    
    // 也尝试解析 JSON 格式（某些版本可能使用）
    try {
      const globals = JSON.parse(globalsParam);
      if (globals.locale) {
        window.__STORYBOOK_CURRENT_LOCALE__ = globals.locale;
        return;
      }
    } catch (e) {
      // JSON 解析失败，继续尝试其他方式
    }
  }
  
  // 方式2: 从 URL 中直接查找 locale 参数
  const localeMatch = window.location.href.match(/[?&]locale=([^&]+)/);
  if (localeMatch) {
    window.__STORYBOOK_CURRENT_LOCALE__ = localeMatch[1];
    return;
  }
  
  // 默认值
  window.__STORYBOOK_CURRENT_LOCALE__ = 'en';
}

// 立即执行初始化
initializeLocale();

// 初始化主题
function initializeTheme() {
  const urlParams = new URLSearchParams(window.location.search);
  const globalsParam = urlParams.get('globals');
  
  if (globalsParam) {
    const themeMatch = globalsParam.match(/theme:([^,]+)/);
    if (themeMatch) {
      window.__STORYBOOK_CURRENT_THEME__ = themeMatch[1];
      return;
    }
  }
  
  window.__STORYBOOK_CURRENT_THEME__ = 'purple';
}

initializeTheme();

// 监听 Storybook 全局参数切换
const channel = addons.getChannel();

channel.on('globalsUpdated', (context) => {
  if (context.globals) {
    if (context.globals.locale) {
      window.__STORYBOOK_CURRENT_LOCALE__ = context.globals.locale;
      window.dispatchEvent(new CustomEvent('storybook-locale-change', { 
        detail: { locale: context.globals.locale } 
      }));
    }
    
    if (context.globals.theme) {
      window.__STORYBOOK_CURRENT_THEME__ = context.globals.theme;
      window.dispatchEvent(new CustomEvent('storybook-theme-change', { 
        detail: { theme: context.globals.theme } 
      }));
    }
  }
});

// 全局 Storybook 参数配置
export const parameters = {
  layout: 'padded',
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
  globalTypes: {
    locale: {
      name: 'locale',
      description: 'Internationalization locale',
      defaultValue: 'zh',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'zh', right: '🇨🇳', title: '中文' },
          { value: 'hk', right: '🇨🇳', title: '繁体中文(香港)' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      name: 'theme',
      description: 'Theme',
      defaultValue: 'purple',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'purple', left: '🟣', title: '紫色主题' },
          { value: 'light', left: '☀️', title: '浅色主题' },
          { value: 'dark', left: '🌙', title: '深色主题' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

// 覆盖 Storybook iframe 内部的默认滚动方式，
// 让 Canvas 区域尽量不再使用自身滚动，从而保证 overlay 类弹层
//（如 nz-select、nz-dropdown、dialog 等）跟随 window 滚动定位
export const decorators = [
  (storyFn) => {
    const story = storyFn();
    return {
      ...story,
      template: `
        <sb-storybook-wrapper>
          <div id="sb-hy-root" style="min-height: 100%; overflow: visible;height:100%">
            ${story.template}
          </div>
        </sb-storybook-wrapper>
      `,
    };
  },
];
