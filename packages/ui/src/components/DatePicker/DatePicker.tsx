"use client";
import React, { useState } from "react";
import styles from "./DatePicker.module.scss";
import { DatePicker as AntDatePicker } from "antd";
import { Typography } from "../Typography/Typography";
import { UilAngleDown, UilAngleUp } from "../../icons";

export type DatePickerProps = {
  label?: string;
  isMandatory?: boolean;
  placeholder?: string;
  value?: any; // Dayjs | null (kept as any to avoid forcing dayjs type)
  onChange?: (value: any, dateString: string | string[]) => void;
  format?: string;
  id?: string;
  name?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
  /** kiri dalam input, default "/date.svg" dari app's public */
  prefixIconSrc?: string;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  isMandatory,
  placeholder,
  value,
  onChange,
  format,
  id,
  name,
  helperText,
  disabled,
  className,
  prefixIconSrc = "/date.svg",
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.wrapper}>
      {label && (
        <div className={styles.label}>
          <Typography variant="TextSRegular">
            {label}
            {isMandatory && <span className="text-danger ml-1">*</span>}
          </Typography>
        </div>
      )}

      <div className={[styles.picker, className || ""].filter(Boolean).join(" ")}>
        {/* Prefix icon inside input */}
        <span className={styles.prefixIcon} aria-hidden="true">
          <img src={prefixIconSrc} alt="" />
        </span>
        <AntDatePicker
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          format={format}
          disabled={disabled}
          open={open}
          onOpenChange={(vis) => setOpen(!!vis)}
          suffixIcon={open ? (
            <UilAngleUp size={20} color="#1D1F20" />
          ) : (
            <UilAngleDown size={20} color="#1D1F20" />
          )}
          style={{ width: "100%" }}
        />
      </div>

      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};

export default DatePicker;