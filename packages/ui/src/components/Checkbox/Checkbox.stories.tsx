import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};

export default meta;

export const Basic: StoryObj<typeof Checkbox> = {
  args: {
    label: "Pilih",
    defaultChecked: false,
  },
};

export const Checked: StoryObj<typeof Checkbox> = {
  args: {
    label: "Terpilih",
    defaultChecked: true,
  },
};