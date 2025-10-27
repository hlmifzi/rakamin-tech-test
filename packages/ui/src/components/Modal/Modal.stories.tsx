import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
  title: "Design System/Modal",
  component: Modal,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Basic: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Modal Title"
          subtitle="Optional subtitle goes here"
          footer={
            <>
              <Button variant="tertiary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button>Confirm</Button>
            </>
          }
        >
          <p>Content area for your modal. Place forms or messages here.</p>
        </Modal>
      </div>
    );
  },
};