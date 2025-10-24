// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react";
import { ColorPalette } from "./ColorPalette";

const meta: Meta<typeof ColorPalette> = {
  title: "Design System/Colors",
  component: ColorPalette,
};
export default meta;

type Story = StoryObj<typeof ColorPalette>;

export const Palette: Story = {
  render: () => <ColorPalette />,
};