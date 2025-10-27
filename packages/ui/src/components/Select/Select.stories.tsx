import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Inputs/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;

export const Basic: StoryObj<typeof Select> = {
  args: {
    label: "Country",
    options: [
      { value: "id", label: "Indonesia" },
      { value: "my", label: "Malaysia" },
      { value: "sg", label: "Singapore" },
    ],
    value: "id",
  },
};