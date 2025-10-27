"use client";
import React from "react";
import styles from "./NumberInput.module.scss";
import { Typography } from "../Typography/Typography";

type NumberInputProps = {
  label?: string;
  isMandatory?: boolean;
  placeholder?: string;
  value?: number | undefined;
  onChange?: (value: number | undefined) => void;
  id?: string;
  name?: string;
  helperText?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  isError?: boolean;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  isMandatory,
  placeholder,
  value,
  onChange,
  id,
  name,
  helperText,
  disabled,
  min,
  max,
  step,
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
              <span className="text-danger ml-1">*</span>
            )}
          </Typography>
        </label>
      )}
      <div className={styles.inputContainer}>
        {before ? (
          <Typography as="span" variant="TextMBold" className={styles.addonBefore}>
            {before}
          </Typography>
        ) : null}
        <input
          id={inputId}
          name={name}
          type="number"
          value={value ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            onChange?.(v === "" ? undefined : Number(v));
          }}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          {...props}
        />
        {after ? <span className={styles.addonAfter}>{after}</span> : null}
      </div>
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};
