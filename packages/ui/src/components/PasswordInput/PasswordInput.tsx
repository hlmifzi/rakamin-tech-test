"use client";
import React, { useState } from "react";
import styles from "./PasswordInput.module.scss";
import { Typography } from "../Typography/Typography";
import { UilEye, UilEyeSlash } from "@iconscout/react-unicons";

export type PasswordInputProps = {
  label?: string;
  isMandatory?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  id?: string;
  name?: string;
  helperText?: string;
  disabled?: boolean;
};

export const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  isMandatory,
  placeholder,
  value,
  onChange,
  id,
  name,
  helperText,
  disabled,
}) => {
  const [visible, setVisible] = useState(false);
  const inputId = id || name || undefined;

  const inputClasses = [styles.input, styles.withAddonAfter].join(" ");

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          <Typography variant="TextSRegular">
            {label}
            {isMandatory && <span className="text-danger">*</span>}
          </Typography>
        </label>
      )}
      <div className={styles.inputContainer}>
        <input
          id={inputId}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          autoComplete={name === "password" ? "current-password" : undefined}
        />
        <span className={styles.addonAfter}>
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            onClick={() => setVisible((v) => !v)}
            className={styles.toggleButton}
          >
            {visible ? <UilEyeSlash size={20} /> : <UilEye size={20} />}
          </button>
        </span>
      </div>
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};

export default PasswordInput;