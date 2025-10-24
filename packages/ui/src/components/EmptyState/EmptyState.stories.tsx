import type { Meta, StoryObj } from "@storybook/react";
import { EmptyState } from "./EmptyState";
import { Button } from "../Button/Button";

const meta: Meta<typeof EmptyState> = {
  title: "Design System/EmptyState",
  component: EmptyState,
  args: {
    title: "No job openings available",
    description: "Create a job opening now and start the candidate process.",
  },
};
export default meta;

type Story = StoryObj<typeof EmptyState>;

export const Basic: Story = {
  args: {
    icon: "/admin/artwork.svg",
  },
};

export const WithPrimaryAction: Story = {
  args: {
    icon: "/admin/artwork.svg",
    primaryAction: <Button variant="primary">Create a new job</Button>,
  },
};