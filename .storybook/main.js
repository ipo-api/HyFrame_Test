module.exports = {
  "stories": ["../projects/frame/**/*.stories.@(js|jsx|ts|tsx)","../stories/**/*.stories",],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials","@storybook/addon-docs","storybook-addon-preview/register"],
  "staticDirs": ['../projects/frame/src/assets'],
  core: {
    builder: "webpack5"
  },
  webpackFinal: async (config, { configType }) => {
    // 添加storysource loader
    config.module.rules.push({
      test: /\.stories\.\w+$/,
      enforce: 'pre',
      use: [{
        loader: require.resolve('@storybook/source-loader'),
        options: {
          // 是否在控制台打印源码
          inline: false,
          // 高亮主题，这里使用的是prismjs的主题
          highlightTheme: 'prism-tomorrow', // 或者其他你喜欢的主题
        },
      }],
    });

    return config;
  },
};