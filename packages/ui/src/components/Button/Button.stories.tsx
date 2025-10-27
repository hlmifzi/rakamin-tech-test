import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { variant: "default" },
};
export const Primary: Story = {
  args: { variant: "primary" },
};
export const Secondary: Story = {
  args: { variant: "secondary" },
};
export const Tertiary: Story = {
  args: { variant: "tertiary" },
};
export const Text: Story = {
  args: { variant: "text" },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Rounded: Story = {
  args: { variant: "default", rounded: true, children: "Rounded" },
};

export const Disabled: Story = {
  args: { variant: "default", disabled: true, children: "Disabled" },
};