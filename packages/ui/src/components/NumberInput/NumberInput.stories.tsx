import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "Inputs/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
};

export default meta;

export const Basic: StoryObj<typeof NumberInput> = {
  args: {
    label: "Age",
    value: 30,
  },
};
