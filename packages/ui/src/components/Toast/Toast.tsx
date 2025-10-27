"use client";
import React from "react";
import { Typography } from "../Typography/Typography";
import styles from "./Toast.module.scss";
import { UilCheckCircle, UilTimes, UilExclamationTriangle } from "../../icons";
import { motion } from "framer-motion";

export type ToastProps = {
  message: string;
  onClose?: () => void;
  className?: string;
  variant?: "success" | "danger" | "default";
};

export const Toast: React.FC<ToastProps> = ({ message, onClose, className, variant = "success" }) => {
  const containerClasses = [
    styles.container,
    variant === "success" ? styles.success : variant === "danger" ? styles.danger : "",
    className || "",
  ].filter(Boolean).join(" ");

  return (
    <motion.div
      role="status"
      aria-live="polite"
      className={containerClasses}
      // Fade-in + slide-up dari bawah
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className={styles.left}>
        <span className={[styles.iconLeft, variant === "danger" ? styles.iconDanger : styles.iconSuccess].join(" ")}>
          {variant === "danger" ? <UilExclamationTriangle size={24} /> : <UilCheckCircle size={24} />}
        </span>
        <Typography variant="TextMBold">{message}</Typography>
      </div>
      <button type="button" aria-label="Close" onClick={onClose} className={styles.closeBtn}>
        <UilTimes size={20} />
      </button>
    </motion.div>
  );
};

export default Toast;