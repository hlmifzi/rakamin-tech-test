import React from "react";
import styles from "./Typography.module.scss";

export type TypographyVariant =
  | "TextXSRegular"
  | "TextXSBold"
  | "TextSRegular"
  | "TextSBold"
  | "TextMRegular"
  | "TextMBold"
  | "TextLRegular"
  | "TextLBold"
  | "HeadingSRegular"
  | "HeadingSBold"
  | "HeadingMRegular"
  | "HeadingMBold"
  | "HeadingLRegular"
  | "HeadingLBold"
  | "DisplayBold"
  // legacy
  | "TextXLBold";

export interface TypographyProps {
  as?: keyof React.JSX.IntrinsicElements;
  variant: TypographyVariant;
  className?: string;
  children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({
  as = "p",
  variant,
  className,
  children,
}) => {
  const Tag = as as any;
  const classes = [styles[variant as keyof typeof styles], className || ""].filter(Boolean).join(" ");
  return <Tag className={classes}>{children}</Tag>;
};

export default Typography;