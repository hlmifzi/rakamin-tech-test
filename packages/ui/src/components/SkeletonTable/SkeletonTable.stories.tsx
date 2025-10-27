import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonTable } from "./SkeletonTable";

const meta: Meta<typeof SkeletonTable> = {
  title: "Feedback/SkeletonTable",
  component: SkeletonTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "A skeleton loading state for tables that matches the styling of the regular Table component.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonTable>;

export const Basic: Story = {
  args: {
    columns: [
      { width: "210px", isFixed: true },
      { width: "189px" },
      { width: "189px" },
      { width: "189px" },
      { width: "189px" },
      { width: "125px" },
      { width: "249px" },
    ],
    rows: 5,
  },
};

export const WithFixedColumn: Story = {
  args: {
    columns: [
      { width: "210px", isFixed: true },
      { width: "189px" },
      { width: "189px" },
      { width: "189px" },
    ],
    rows: 3,
  },
};

export const ManyRows: Story = {
  args: {
    columns: [
      { width: "200px", isFixed: true },
      { width: "150px" },
      { width: "150px" },
      { width: "150px" },
      { width: "150px" },
    ],
    rows: 10,
  },
};

export const SimpleColumns: Story = {
  args: {
    columns: [
      { width: "200px" },
      { width: "200px" },
      { width: "200px" },
    ],
    rows: 4,
  },
};