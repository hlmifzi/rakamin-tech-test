import type { Preview } from "@storybook/react";
import "../src/styles/preview.scss";

const preview: Preview = {
  parameters: {
    controls: { expanded: true }
  }
};

export default preview;