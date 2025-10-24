"use client";
import React from "react";
import { Select as AntSelect } from "antd";
import styles from "./Select.module.scss";
import { Typography } from "../Typography/Typography";

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
}) => {
  return (
    <div className={styles.wrapper}>
      {label && (
        <div className={styles.label}>
          <Typography variant="TextSRegular">
            {label}
            {isMandatory && (
              <span className="text-danger ml-1">*</span>
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
        className={styles.select}
        style={{ width: '100%' }}
      />
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};
