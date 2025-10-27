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

export const Success: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ height: 300 }}>
        {open && (
          <Toast 
            variant="success" 
            message="Perubahan berhasil disimpan" 
            onClose={() => setOpen(false)} 
          />
        )}
      </div>
    );
  },
};

export const Danger: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ height: 300 }}>
        {open && (
          <Toast 
            variant="danger" 
            message="Terjadi kesalahan saat menyimpan data" 
            onClose={() => setOpen(false)} 
          />
        )}
      </div>
    );
  },
};

export const Warning: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ height: 300 }}>
        {open && (
          <Toast 
            variant="warning" 
            message="Peringatan: Data akan dihapus secara permanen" 
            onClose={() => setOpen(false)} 
          />
        )}
      </div>
    );
  },
};