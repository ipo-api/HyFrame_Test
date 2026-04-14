// .storybook/manager.js

import { addons } from '@storybook/addons';
import * as prettier from "prettier/standalone";
import * as htmlParser from "prettier/parser-html";
import * as typescriptParser from "prettier/parser-typescript";
import * as markdownParser from 'prettier/parser-markdown'; 

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: 'right',
  enableShortcuts: true,
  isToolshown: true,
  theme: undefined,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: false,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false, },
    zoom: { hidden: false, },
    eject: { hidden: false, },
    copy: { hidden: false, },
    fullscreen: { hidden: false, },
  },
  previewFormatter: (format, code) => {
    if (format === "ts") {
      return prettier.format(code, {
        parser: 'typescript', // 使用 TypeScript 解析器
        plugins: [
          typescriptParser,
        ],
      });
    } else if (format === "html") {
      return prettier.format(code, {
        parser: "html",
        printWidth: 180, // 换行的宽度限制
        plugins: [
          htmlParser,
        ],
      });
    }else if(format === 'markdown'){
      return prettier.format(code, {
        parser: "markdown",
        plugins: [
          markdownParser,
        ],
      });
    }
    return code;
  },
});