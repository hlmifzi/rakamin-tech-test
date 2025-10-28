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
  /** Icon di sisi kiri dalam input (React node), override jika diset */
  prefixIcon?: React.ReactNode;
  /** Alternatif: path gambar icon, mis. "/date.svg" dari public app */
  prefixIconSrc?: string | React.ReactNode;
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
  prefixIcon,
  prefixIconSrc,
}) => {
  const [open, setOpen] = useState(false);
  // Resolve prefix icon node: prefer explicit ReactNode, otherwise build from src string
  let prefixIconNode: React.ReactNode | null =
    prefixIcon ??
    (typeof prefixIconSrc === "string"
      ? <img src={prefixIconSrc} alt="date" />
      : (prefixIconSrc ?? null));

  // If user passes a React element (e.g., Next <Image />), ensure width/height are set
  if (React.isValidElement(prefixIconNode)) {
    const props: any = (prefixIconNode as any).props || {};
    const width = props.width ?? 18;
    const height = props.height ?? 18;
    try {
      prefixIconNode = React.cloneElement(prefixIconNode as any, { width, height });
    } catch {
      // ignore clone failures for elements that don't accept width/height
    }
  }
  return (
    <div className={styles.wrapper}>
      {label && (
        <div className={styles.label}>
          <Typography variant="TextSRegular">
            {label}
            {isMandatory && <span className="text-danger">*</span>}
          </Typography>
        </div>
      )}

      <div className={[styles.picker, className || ""].filter(Boolean).join(" ")}>
        {/* Prefix icon inside input */}
        {prefixIconNode ? (
          <span className={styles.prefixIcon} aria-hidden="true">
            {prefixIconNode}
          </span>
        ) : null}
        <AntDatePicker
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          classNames={{ popup: { root: styles.antdDatePickerPopup } as any }}
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