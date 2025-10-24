import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Design System/Typography",
  component: Typography,
};

export default meta;

type Story = StoryObj<typeof Typography>;

const variants = [
  { v: "TextXSRegular", label: "Text XS / Regular - 10/16" },
  { v: "TextXSBold", label: "Text XS / Bold - 10/16" },
  { v: "TextSRegular", label: "Text S / Regular - 12/20" },
  { v: "TextSBold", label: "Text S / Bold - 12/20" },
  { v: "TextMRegular", label: "Text M / Regular - 14/24" },
  { v: "TextMBold", label: "Text M / Bold - 14/24" },
  { v: "TextLRegular", label: "Text L / Regular - 16/28" },
  { v: "TextLBold", label: "Text L / Bold - 16/28" },
  { v: "HeadingSRegular", label: "Heading S / Regular - 20/32" },
  { v: "HeadingSBold", label: "Heading S / Bold - 20/32" },
  { v: "HeadingMRegular", label: "Heading M / Regular - 24/36" },
  { v: "HeadingMBold", label: "Heading M / Bold - 24/36" },
  { v: "HeadingLRegular", label: "Heading L / Regular - 32/44" },
  { v: "HeadingLBold", label: "Heading L / Bold - 32/44" },
  { v: "DisplayBold", label: "Display / Bold - 48/64" },
  // legacy
  { v: "TextXLBold", label: "Text XL / Bold - 18/28 (legacy)" },
] as const;

export const Samples: Story = {
  render: () => (
    <div style={{ display: "grid", gap: 8 }}>
      {variants.map(({ v, label }) => (
        <Typography key={v} variant={v as any}>
          {label}
        </Typography>
      ))}
    </div>
  ),
};