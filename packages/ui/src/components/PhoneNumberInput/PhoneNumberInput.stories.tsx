import type { Meta, StoryObj } from "@storybook/react";
import { PhoneNumberInput } from "./PhoneNumberInput";

const meta: Meta<typeof PhoneNumberInput> = {
  title: "Inputs/PhoneNumberInput",
  component: PhoneNumberInput,
  tags: ["autodocs"],
};

export default meta;

export const Basic: StoryObj<typeof PhoneNumberInput> = {
  args: {
    label: "Phone number",
    isMandatory: true,
    value: "+62 8134233551",
    helperText: "",
  },
};

export const Error: StoryObj<typeof PhoneNumberInput> = {
  args: {
    label: "Phone number",
    isMandatory: true,
    value: "+62 8134233551",
    helperText: "Error Message",
    isError: true,
  },
};