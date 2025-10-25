import React from "react";
import styles from "./Checkbox.module.scss";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  defaultChecked,
  onChange,
  label,
  className,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label className={[styles.container, className || ""].filter(Boolean).join(" ")}> 
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={handleChange}
      />
      {label ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
};

export default Checkbox;