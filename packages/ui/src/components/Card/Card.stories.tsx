import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Card } from "./Card";
import { Typography, Button } from "../../index";

const meta: Meta<typeof Card> = {
  title: "Design System/Card",
  component: Card,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card>
      <Typography variant="TextLRegular">This is a basic card</Typography>
    </Card>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Typography variant="TextXLBold">Card Title</Typography>
          <Typography variant="TextMRegular">Some description text</Typography>
        </div>
        <Button variant="primary">Action</Button>
      </div>
    </Card>
  ),
};