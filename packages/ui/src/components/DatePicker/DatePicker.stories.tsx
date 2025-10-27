import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "Inputs/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
};

export default meta;

export const Basic: StoryObj<typeof DatePicker> = {
  args: {
    label: "Date",
    placeholder: "Select date",
  },
};