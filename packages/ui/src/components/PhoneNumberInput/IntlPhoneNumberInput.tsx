"use client";
import React, { useEffect, useRef } from "react";
import styles from "./PhoneNumberInput.module.scss";
import { Typography } from "../Typography/Typography";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

export type PhoneNumberInputProps = {
  label?: string;
  isMandatory?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  country?: string; // ISO2 country code, e.g. "ID"
  onCountryChange?: (code: string) => void;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
};

export const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  isMandatory,
  value,
  onChange,
  country = "ID",
  onCountryChange,
  helperText,
  placeholder = "Phone number",
  disabled,
  isError = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const itiRef = useRef<any>(null);

  useEffect(() => {
    if (!inputRef.current) return;
    itiRef.current = intlTelInput(inputRef.current, {
      // utils provide formatting and validation helpers
      loadUtils: () => import("intl-tel-input/utils"),
      // plugin expects lowercase ISO2 union type; cast to keep types calm
      initialCountry: country.toLowerCase() as any,
      separateDialCode: false,
    });

    const handleCountryChange = () => {
      const data = itiRef.current?.getSelectedCountryData?.();
      const iso2 = (data?.iso2 || country).toUpperCase();
      onCountryChange?.(iso2);
    };
    inputRef.current.addEventListener("countrychange", handleCountryChange);

    return () => {
      inputRef.current?.removeEventListener("countrychange", handleCountryChange);
      if (itiRef.current?.destroy) {
        itiRef.current.destroy();
      }
      itiRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // reflect external country changes
  useEffect(() => {
    if (!itiRef.current) return;
    try {
      itiRef.current.setCountry(country.toLowerCase());
    } catch {
      // ignore runtime issues for unknown codes
    }
  }, [country]);

  // reflect external value changes
  useEffect(() => {
    if (!itiRef.current) return;
    if (value === undefined) return;
    try {
      itiRef.current.setNumber(value);
    } catch {
      // ignore formatting errors
    }
  }, [value]);

  const inputClasses = [styles.input, isError ? styles.error : ""]
    .filter(Boolean)
    .join(" ");

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

      <input
        type="tel"
        className={inputClasses}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        inputMode="tel"
        ref={inputRef}
      />

      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};

export default PhoneNumberInput;