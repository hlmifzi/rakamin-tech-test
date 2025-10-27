"use client";
import React from "react";
import styles from "./TextInput.module.scss";
import { Typography } from "../Typography/Typography";

type TextInputProps = {
  label?: string;
  isMandatory?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  helperText?: string;
  disabled?: boolean;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  type?: "text" | "email" | "password";
  isError?: boolean;
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  isMandatory,
  placeholder,
  value,
  onChange,
  id,
  name,
  helperText,
  disabled,
  addonBefore,
  addonAfter,
  isError = false,
  ...props
}) => {
  const inputId = id || name || undefined;
  const before = addonBefore;
  const after = addonAfter;
  const inputClasses = [
    styles.input,
    isError ? styles.error : "",
    before ? styles.withAddonBefore : "",
    after ? styles.withAddonAfter : "",
  ]
    .filter(Boolean)
    .join(" ");

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
      <div className={styles.inputContainer}>
        {before ? <span className={styles.addonBefore}>{before}</span> : null}
        <input
          id={inputId}
          name={name}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
        {after ? <span className={styles.addonAfter}>{after}</span> : null}
      </div>
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};
