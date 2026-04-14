import { setCompodocJson } from "@storybook/addon-docs/angular";
import docJson from "../documentation.json";
import '../projects/frame/src/styles/hy-new.less';
setCompodocJson(docJson);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded:true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
  backgrounds: {
    default: 'light'
  }
}