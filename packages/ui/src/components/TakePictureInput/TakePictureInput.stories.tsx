import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { TakePictureInput } from "./TakePictureInput";

const meta: Meta<typeof TakePictureInput> = {
  title: "Inputs/TakePictureInput",
  component: TakePictureInput,
  parameters: {
    layout: "fullscreen",
    docs: {
      // Beri ruang tinggi cukup di halaman Docs agar overlay modal terlihat penuh
      canvas: { sourceState: "shown" },
    },
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
    <div style={{ minHeight: "80vh", padding: 24, background: "#f6f7f9" }}>
      <TakePictureInput
        {...args}
        onCaptured={(dataUrl: string) => {
          // Tampilkan di console untuk verifikasi integrasi
          console.log("[Storybook] Photo captured:", dataUrl.substring(0, 60) + "...");
        }}
      />
    </div>
  ),
};

export const WithLabel: Story = {
  args: {
    label: "Candidate Photo",
  },
};