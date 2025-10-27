import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Inputs/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
};

export default meta;

export const Basic: StoryObj<typeof PasswordInput> = {
  args: {
    label: "Password",
    placeholder: "Enter your password",
    name: "password",
  },
};