import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

const meta: Meta<typeof TextInput> = {
  title: "Inputs/TextInput",
  component: TextInput,
};

export default meta;

export const Basic: StoryObj<typeof TextInput> = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    value: "",
  },
};
