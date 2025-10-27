import React from "react";
import { Skeleton as AntSkeleton } from "antd";

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
  return (
    <AntSkeleton
      active={active}
      loading={loading}
      avatar={avatar}
      title={title}
      paragraph={paragraph}
      round={round}
      className={className}
    />
  );
};

export const SkeletonAvatar: React.FC<{ size?: "small" | "default" | "large" | number; shape?: "circle" | "square"; className?: string }>
  = ({ size = "default", shape = "circle", className }) => {
    const AnySkeleton: any = AntSkeleton as any;
    const AvatarComp = AnySkeleton?.Avatar;
    if (typeof AvatarComp === "function") {
      return <AvatarComp active size={size} shape={shape} className={className} />;
    }
    // Fallback rectangle/circle
    const px = typeof size === "number" ? size : size === "small" ? 24 : size === "large" ? 40 : 32;
    const style: React.CSSProperties = {
      width: px,
      height: px,
      borderRadius: shape === "circle" ? px / 2 : 8,
      backgroundColor: "#E5E7EB",
    };
    return <div className={className} style={style} aria-hidden />;
  };

export const SkeletonInput: React.FC<{ size?: "small" | "default" | "large"; block?: boolean; className?: string }>
  = ({ size = "default", block = true, className }) => {
    const AnySkeleton: any = AntSkeleton as any;
    const InputComp = AnySkeleton?.Input;
    // In some bundlers/versions, Skeleton.Input may not be exposed.
    // Fallback to Skeleton.Button with round shape to mimic an input field.
    if (typeof InputComp === "function") {
      return <InputComp active size={size} block={block} className={className} />;
    }
    const ButtonComp = AnySkeleton?.Button;
    if (typeof ButtonComp === "function") {
      return <ButtonComp active size={size} shape="round" block={block} className={className} />;
    }
    // Final fallback: simple rectangle to avoid undefined element errors
    const height = size === "small" ? 24 : size === "large" ? 40 : 32;
    const style: React.CSSProperties = {
      height,
      width: block ? "100%" : undefined,
      borderRadius: 8,
      backgroundColor: "#E5E7EB", // neutral-30
    };
    return <div className={className} style={style} aria-hidden />;
  };

export const SkeletonButton: React.FC<{ size?: "small" | "default" | "large"; shape?: "default" | "round"; block?: boolean; className?: string }>
  = ({ size = "default", shape = "default", block = false, className }) => {
    const AnySkeleton: any = AntSkeleton as any;
    const ButtonComp = AnySkeleton?.Button;
    if (typeof ButtonComp === "function") {
      return <ButtonComp active size={size} shape={shape} block={block} className={className} />;
    }
    // Fallback rectangle
    const height = size === "small" ? 24 : size === "large" ? 40 : 32;
    const radius = shape === "round" ? 999 : 8;
    const style: React.CSSProperties = {
      height,
      width: block ? "100%" : undefined,
      borderRadius: radius,
      backgroundColor: "#E5E7EB",
    };
    return <div className={className} style={style} aria-hidden />;
  };

export const SkeletonImage: React.FC<{ className?: string }>
  = ({ className }) => {
    const AnySkeleton: any = AntSkeleton as any;
    const ImageComp = AnySkeleton?.Image;
    if (typeof ImageComp === "function") {
      return <ImageComp active className={className} />;
    }
    // Fallback rectangle
    const style: React.CSSProperties = {
      width: "100%",
      height: 160,
      borderRadius: 12,
      backgroundColor: "#E5E7EB",
    };
    return <div className={className} style={style} aria-hidden />;
  };

export default Skeleton;