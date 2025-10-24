import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  // Simplify setup to avoid preview issues; docs/static can be re-enabled later
  addons: [],
  viteFinal: async (config) => {
    return config;
  }
};

export default config;