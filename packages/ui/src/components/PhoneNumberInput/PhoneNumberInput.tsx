"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./PhoneNumberInput.module.scss";
import { Typography } from "../Typography/Typography";
import { UilSearch, UilAngleDown } from "../../icons";

export type CountryOption = {
  code: string; // ISO-like code
  name: string;
  dialCode: string; // e.g. +62
  flag?: string; // emoji or svg path
};

export type PhoneNumberInputProps = {
  label?: string;
  isMandatory?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  country?: string; // code
  onCountryChange?: (code: string) => void;
  helperText?: string;
  placeholder?: string;
  disabled?: boolean;
  isError?: boolean;
  countries?: CountryOption[];
};

const DEFAULT_COUNTRIES: CountryOption[] = [
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲" },
  { code: "PS", name: "Palestine", dialCode: "+970", flag: "🇵🇸" },
  { code: "PY", name: "Paraguay", dialCode: "+595", flag: "🇵🇾" },
  { code: "PE", name: "Peru", dialCode: "+51", flag: "🇵🇪" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "PR", name: "Puerto Rico", dialCode: "+1", flag: "🇵🇷" },
];

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
  countries = DEFAULT_COUNTRIES,
}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const selected = countries.find((c) => c.code === country) ?? countries[0];

  const filtered = useMemo(() => {
    if (!searchTerm) return countries;
    const term = searchTerm.toLowerCase();
    return countries.filter((c) => c.name.toLowerCase().includes(term));
  }, [countries, searchTerm]);

  const containerClasses = [styles.container, isError ? styles.error : ""]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const onBodyClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onBodyClick);
    return () => document.removeEventListener("mousedown", onBodyClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      {label && (
        <div className={styles.label}>
          <Typography variant="TextSRegular">
            {label}
            {isMandatory && <span className="text-danger ml-1">*</span>}
          </Typography>
        </div>
      )}

      <div className={containerClasses}>
        <button
          type="button"
          className={styles.country}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className={styles.flag}>{selected.flag ?? ""}</span>
          <UilAngleDown className={styles.chevron} />
        </button>
        {open && (
          <div className={styles.dropdown} role="listbox">
            <div className={styles.searchBox}>
              <UilSearch className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.items}>
              {filtered.length === 0 ? (
                <div className={styles.notFound}>
                  Keyword “{searchTerm}” tidak ditemukan
                </div>
              ) : (
                filtered.map((c) => (
                  <div
                    key={c.code}
                    className={styles.item}
                    role="option"
                    aria-selected={c.code === selected.code}
                    onClick={() => {
                      onCountryChange?.(c.code);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className={styles.flag}>{c.flag ?? ""}</span>
                      <span className={styles.countryName}>{c.name}</span>
                    </div>
                    <span className={styles.dialCode}>{c.dialCode}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        <span className={styles.divider} />
        <input
          type="tel"
          className={styles.input}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          inputMode="tel"
        />
      </div>

      {helperText && <p className={styles.helper}>{helperText}</p>}
    </div>
  );
};

export default PhoneNumberInput;