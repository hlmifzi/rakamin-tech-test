import * as React from "react";

export type IconProps = {
  size?: number | string;
  color?: string;
  className?: string;
  title?: string;
};

export const IconEmail: React.FC<IconProps> = ({ size = 20, color = "#475569", className, title }) => {
  return (
    <svg
      width={typeof size === "number" ? size : undefined}
      height={typeof size === "number" ? size : undefined}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <rect x="3" y="5" width="18" height="14" rx="2" stroke={color} strokeWidth="2" />
      <path d="M3 7l9 6 9-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export default IconEmail;