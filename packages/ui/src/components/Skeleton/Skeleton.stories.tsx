import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Skeleton, SkeletonAvatar, SkeletonInput, SkeletonButton, SkeletonImage } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const Basic: Story = {
  args: {
    active: true,
    title: true,
    paragraph: { rows: 3 },
  },
};

export const WithAvatar: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <div style={{ display: "grid", gridTemplateColumns: "48px auto", alignItems: "center", gap: 12 }}>
        <SkeletonAvatar shape="square" size={48} />
        <Skeleton active title paragraph={{ rows: 2 }} />
      </div>
      <Skeleton active paragraph={{ rows: 4 }} />
    </div>
  ),
};

export const ListCards: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: 16 }}>
          <Skeleton active title paragraph={{ rows: 2 }} />
        </div>
      ))}
    </div>
  ),
};

export const Subcomponents: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <SkeletonInput size="large" />
        <SkeletonButton size="default" />
        <SkeletonButton size="large" shape="round" />
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 160, border: "1px dashed #E5E7EB", borderRadius: 8 }}>
        <SkeletonImage />
      </div>
    </div>
  ),
};