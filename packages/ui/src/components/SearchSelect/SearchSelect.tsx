"use client";
import React, { useState } from "react";
import { Select as AntSelect } from "antd";
import { Typography } from "../Typography/Typography";
import { UilAngleDown, UilAngleUp } from "@iconscout/react-unicons";
import styles from "./SearchSelect.module.scss";

type SearchSelectOption = {
  value: string;
  label: string;
};

export type SearchSelectProps = {
  label?: string;
  isMandatory?: boolean;
  options: SearchSelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  helperText?: string;
  disabled?: boolean;
  isError?: boolean;
  allowClear?: boolean;
  showSearch?: boolean;
};

export const SearchSelect: React.FC<SearchSelectProps> = ({
  label,
  isMandatory,
  options,
  value,
  onChange,
  placeholder = "Search to Select",
  id,
  name,
  helperText,
  disabled,
  isError = false,
  allowClear = true,
  showSearch = true,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={[styles.wrapper, isError ? styles.error : ""].filter(Boolean).join(" ")}>
      {label && (
        <div className={styles.label}>
          <Typography variant="TextSRegular">
            {label}
            {isMandatory && <span className="text-danger">*</span>}
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
        allowClear={allowClear}
        showSearch={showSearch}
        optionFilterProp="label"
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
        }
        suffixIcon={
          open ? <UilAngleUp size={20} color="#1D1F20" /> : <UilAngleDown size={20} color="#1D1F20" />
        }
        className={styles.searchSelect}
        style={{ width: "100%" }}
      />
      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};