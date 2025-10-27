import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ height: 300 }}>
        {open && (
          <Toast message="Perubahan berhasil disimpan" onClose={() => setOpen(false)} />
        )}
      </div>
    );
  },
};