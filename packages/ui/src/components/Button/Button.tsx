import React from "react";
import styles from "./Button.module.scss";

export type ButtonVariant = "default" | "primary" | "secondary" | "tertiary" | "text";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  rounded?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  rounded = false,
  className,
  children,
  disabled,
  ...props
}) => {
  const classes = [
    styles.button,
    styles[size],
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    rounded ? styles.rounded : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {leftIcon ? <span className={styles.iconLeft}>{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span className={styles.iconRight}>{rightIcon}</span> : null}
    </button>
  );
};

export default Button;