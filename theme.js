const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const LessPluginNpmImport = require('less-plugin-npm-import');

const fs = require('fs');
// const darkThemeVars = require('./projects/frame/node_modules/ng-zorro-antd/dark-theme');
const darkThemeVars = require('./projects/frame/node_modules/ng-zorro-antd/dark-theme');
const compactThemeVars = require('./projects/frame/node_modules/ng-zorro-antd/compact-theme');

const appStyles = 'src/styles.less'; // 应用的样式入口文件
let themeContent = `@import '${appStyles}';`;

function generateThemeCss(type) {

    // themeContent = `@import 'src/` : `@import 'src/compact-theme.less';`;
    themeContent = `@import './projects/frame/src/styles/theme/`;
    switch (type){
        case 'dark':
            themeContent += 'dark';
        break;
        case 'light':
            themeContent += 'light';
        break;
        case 'test':
            themeContent += 'test';
        break;
    }
    themeContent+=`-theme.less';`;
    console.log(themeContent,'themeContent')

    return less.render(
        themeContent, {
        javascriptEnabled: true,
        plugins: [
            new LessPluginNpmImport({ prefix: '~' }),
            new LessPluginCleanCSS({ advanced: true })
        ],
        modifyVars: {
            'hack': `true;@import "${require.resolve('./projects/frame/node_modules/ng-zorro-antd/style/color/colorPalette.less')}";`,
            // 'hack': `true;@import "${require.resolve('ng-zorro-antd/style/color/colorPalette.less')}";`,
            ...(type === 'dark' ? darkThemeVars : '')
        }
    }).then(data => {
        fs.writeFileSync(
            // 主题样式的输出文件
            `projects/frame/src/assets/themes/style.${type}.css`,
            data.css
        )
    }).catch(e => {
        // 记录渲染错误
        console.error('error',type, e);
    });
}


Promise.all([
    generateThemeCss('dark'),
    generateThemeCss('light'),
    generateThemeCss('test'),
]).then(() => {
    console.log('theme generate success ...');
},(err)=>{
    console.log(err);
});