"use client";
import React from "react";
import styles from "./TextArea.module.scss";
import { Typography } from "../Typography/Typography";

type TextAreaProps = {
  label?: string;
  isMandatory?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  helperText?: string;
  disabled?: boolean;
  rows?: number;
};

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  isMandatory,
  placeholder,
  value,
  onChange,
  id,
  name,
  helperText,
  disabled,
  rows = 4,
}) => {
  const inputId = id || name || undefined;
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          <Typography variant="TextSRegular">
            {label}
            {isMandatory && (
              <span className="text-danger">*</span>
            )}
          </Typography>
        </label>
      )}
      <textarea
        id={inputId}
        name={name}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={styles.textarea}
        disabled={disabled}
        rows={rows}
      />
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};
