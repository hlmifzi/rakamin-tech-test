import type { Meta, StoryObj } from "@storybook/react";
import { TextArea } from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "Inputs/TextArea",
  component: TextArea,
};

export default meta;

export const Basic: StoryObj<typeof TextArea> = {
  args: {
    label: "About",
    placeholder: "Tell us about yourself",
  },
};
