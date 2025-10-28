"use client";
import React from "react";
import Typography from "../Typography/Typography";
import styles from "./Modal.module.scss";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  closeOnOverlay?: boolean;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  closeOnOverlay = true,
  className,
}) => {
  if (!open) return null;

  const headerNode = title || subtitle ? (
    <div className={styles.header}>
      {title && <Typography variant="HeadingMBold">{title}</Typography>}
      {subtitle && <Typography variant="TextMRegular">{subtitle}</Typography>}
       {/* Tombol close (X) di pojok kanan atas) */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
    </div>
  ) : null;

  const handleOverlayClick = () => {
    if (closeOnOverlay) onClose();
  };

  const stopPropagation: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" onClick={handleOverlayClick}>
      <div className={className || styles.container} onClick={stopPropagation}>
       
        {/* Header */}
        {headerNode}

        {/* Body */}
        {children && <div className={styles.body}>{children}</div>}

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
export { Modal };
