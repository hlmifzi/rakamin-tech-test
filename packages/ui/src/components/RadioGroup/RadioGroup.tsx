import React from "react";
import styles from "./RadioGroup.module.scss";
import { Typography } from "../../components/Typography/Typography";

export type RadioOption = {
  label: string;
  value: string;
};

export type RadioGroupProps = {
  label?: string;
  isMandatory?: boolean;
  name?: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  className?: string;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  isMandatory,
  name,
  options,
  value,
  onChange,
  disabled,
  error,
  helperText,
  className,
}) => {
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      {label && (
        <div className={styles.labelRow}>
          <Typography variant="TextSRegular">
            {label} {isMandatory && <span className={styles.required}>*</span>}
          </Typography>
        </div>
      )}
      <div className={styles.options} role="radiogroup" aria-label={label}>
        {options.map((opt) => {
          const checked = value === opt.value;
          const id = `${name ?? "radio"}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={id}
              className={`${styles.option} ${disabled ? styles.disabled : ""}`}
              aria-checked={checked}
              aria-disabled={disabled}
              onClick={() => {
                if (!disabled) onChange?.(opt.value);
              }}
            >
              <input
                type="radio"
                value={opt.value}
                name={name}
                checked={checked}
                onChange={() => onChange?.(opt.value)}
                disabled={disabled}
                className="sr-only peer"
                id={id}
              />
              <span className={styles.radioOuter} />
              <Typography variant="TextMRegular" className="text-neutral-90">
                {opt.label}
              </Typography>
            </label>
          );
        })}
      </div>
      {error && helperText && (
        <div className={styles.errorText} role="alert">{helperText}</div>
      )}
    </div>
  );
};