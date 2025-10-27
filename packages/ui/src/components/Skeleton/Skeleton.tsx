import React from "react";

export interface SkeletonProps {
  active?: boolean;
  loading?: boolean;
  avatar?: boolean | { size?: "small" | "default" | "large" | number; shape?: "circle" | "square" };
  title?: boolean;
  paragraph?: false | { rows?: number; width?: number | string | Array<number | string> };
  round?: boolean;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  active = true,
  loading = true,
  avatar,
  title = true,
  paragraph = { rows: 2 },
  round,
  className,
}) => {
  if (!loading) return null;

  const radiusClass = round ? "rounded-full" : "rounded-md";
  const pulseClass = active ? "animate-pulse" : "";

  const renderAvatar = () => {
    if (!avatar) return null;
    const opts = typeof avatar === "boolean" ? {} : avatar;
    const size = opts?.size ?? "default";
    const shape = opts?.shape ?? "circle";
    const px = typeof size === "number" ? size : size === "small" ? 24 : size === "large" ? 40 : 32;
    const style: React.CSSProperties = {
      width: px,
      height: px,
      borderRadius: shape === "circle" ? px / 2 : 8,
      backgroundColor: "#E5E7EB",
    };
    return <div style={style} aria-hidden className={`${pulseClass}`} />;
  };

  const renderTitle = () => {
    if (!title) return null;
    return (
      <div
        aria-hidden
        className={`${radiusClass} ${pulseClass}`}
        style={{ height: 18, width: "60%", backgroundColor: "#E5E7EB" }}
      />
    );
  };

  const renderParagraph = () => {
    // If explicitly disabled, don't render paragraph lines
    if (paragraph === false) return null;
    const rows = paragraph?.rows ?? 2;
    const width = paragraph?.width;
    const rowWidths: Array<number | string> = Array.from({ length: rows }).map((_, i) => {
      if (Array.isArray(width)) return width[i] ?? "100%";
      if (typeof width === "number" || typeof width === "string") return width;
      // Default: last row shorter
      if (i === rows - 1) return "80%";
      return "100%";
    });
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            aria-hidden
            className={`${radiusClass} ${pulseClass}`}
            style={{ height: 14, width: rowWidths[i], backgroundColor: "#E5E7EB" }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        {renderAvatar()}
        <div className="flex-1 flex flex-col gap-2">
          {renderTitle()}
          {renderParagraph()}
        </div>
      </div>
    </div>
  );
};

export const SkeletonAvatar: React.FC<{ size?: "small" | "default" | "large" | number; shape?: "circle" | "square"; className?: string }>
  = ({ size = "default", shape = "circle", className }) => {
    const px = typeof size === "number" ? size : size === "small" ? 24 : size === "large" ? 40 : 32;
    const style: React.CSSProperties = {
      width: px,
      height: px,
      borderRadius: shape === "circle" ? px / 2 : 8,
      backgroundColor: "#E5E7EB",
    };
    return <div className={`animate-pulse ${className ?? ""}`} style={style} aria-hidden />;
  };

export const SkeletonInput: React.FC<{ size?: "small" | "default" | "large"; block?: boolean; className?: string }>
  = ({ size = "default", block = true, className }) => {
    const height = size === "small" ? 24 : size === "large" ? 40 : 32;
    const style: React.CSSProperties = {
      height,
      width: block ? "100%" : undefined,
      borderRadius: 8,
      backgroundColor: "#E5E7EB",
    };
    return <div className={`animate-pulse ${className ?? ""}`} style={style} aria-hidden />;
  };

export const SkeletonButton: React.FC<{ size?: "small" | "default" | "large"; shape?: "default" | "round"; block?: boolean; className?: string }>
  = ({ size = "default", shape = "default", block = false, className }) => {
    const height = size === "small" ? 24 : size === "large" ? 40 : 32;
    const width = block ? "100%" : (size === "small" ? 88 : size === "large" ? 160 : 120);
    const radius = shape === "round" ? 999 : 8;
    const style: React.CSSProperties = {
      display: "inline-block",
      height,
      width,
      borderRadius: radius,
      backgroundColor: "#E5E7EB",
    };
    return <div className={`animate-pulse ${className ?? ""}`} style={style} aria-hidden />;
  };

export const SkeletonImage: React.FC<{ className?: string }>
  = ({ className }) => {
    const style: React.CSSProperties = {
      width: "100%",
      height: 160,
      borderRadius: 12,
      backgroundColor: "#E5E7EB",
    };
    return <div className={`animate-pulse ${className ?? ""}`} style={style} aria-hidden />;
  };

export default Skeleton;