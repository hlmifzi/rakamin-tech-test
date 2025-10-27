import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs"
  ],
  docs: {
    autodocs: true,
  },
  viteFinal: async (config) => {
    return config;
  }
};

export default config;