import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TakePictureInput } from "./TakePictureInput";

const meta: Meta<typeof TakePictureInput> = {
  title: "Inputs/TakePictureInput",
  component: TakePictureInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Photo Profile",
    defaultImageSrc: "/candidate/default-picture.webp",
  },
};

export default meta;

type Story = StoryObj<typeof TakePictureInput>;

export const Basic: Story = {
  render: (args) => (
    <TakePictureInput
      {...args}
      onCaptured={(dataUrl: string) => {
        // Tampilkan di console untuk verifikasi integrasi
        console.log("[Storybook] Photo captured:", dataUrl.substring(0, 60) + "...");
      }}
    />
  ),
};

export const WithLabel: Story = {
  args: {
    label: "Candidate Photo",
  },
};