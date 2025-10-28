"use client";
import React, { useState } from "react";
import { Select as AntSelect } from "antd";
import styles from "./Select.module.scss";
import { Typography } from "../Typography/Typography";
import { UilAngleDown, UilAngleUp } from "@iconscout/react-unicons";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label?: string;
  isMandatory?: boolean;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  helperText?: string;
  disabled?: boolean;
  isError?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  label,
  isMandatory,
  options,
  value,
  onChange,
  placeholder,
  id,
  name,
  helperText,
  disabled,
  isError = false,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={[styles.wrapper, isError ? styles.error : ""].filter(Boolean).join(" ")}>
      {label && (
        <div className={styles.label}>
          <Typography variant="TextSRegular">
            {label}
            {isMandatory && (
              <span className="text-danger">*</span>
            )}
          </Typography>
        </div>
      )}
      <AntSelect
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        options={options}
        open={open}
        onOpenChange={(vis: boolean) => setOpen(vis)}
        suffixIcon={
          open ? (
            <UilAngleUp size={20} color="#1D1F20" />
          ) : (
            <UilAngleDown size={20} color="#1D1F20" />
          )
        }
        className={styles.select}
        style={{ width: '100%' }}
      />
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};
