// @ts-nocheck
"use client";
import React from "react";

type SwatchProps = {
  label: string;
  className: string;
};

const Swatch: React.FC<SwatchProps> = ({ label, className }) => {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-24 h-14 rounded-lg border border-neutral-60 shadow-sm ${className}`} />
      <div className="flex flex-col">
        <div className="text-neutral-90 text-sm font-semibold">{label}</div>
        <div className="text-neutral-70 text-xs">{className}</div>
      </div>
    </div>
  );
};

type GroupProps = { title: string; items: SwatchProps[] };

const Group: React.FC<GroupProps> = ({ title, items }) => {
  return (
    <div className="mb-8">
      <div className="text-neutral-90 font-bold mb-4 text-base">{title}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {items.map((item: SwatchProps) => (
          <Swatch key={`${title}-${item.label}`} label={item.label} className={item.className} />
        ))}
      </div>
    </div>
  );
};

export const ColorPalette: React.FC = () => {
  return (
    <div className="p-6">
      <Group
        title="Neutral"
        items={[
          { label: "Neutral / 10", className: "bg-neutral-10" },
          { label: "Neutral / 20", className: "bg-neutral-20" },
          { label: "Neutral / 30", className: "bg-neutral-30" },
          { label: "Neutral / 40", className: "bg-neutral-40" },
          { label: "Neutral / 50", className: "bg-neutral-50" },
          { label: "Neutral / 60", className: "bg-neutral-60" },
          { label: "Neutral / 70", className: "bg-neutral-70" },
          { label: "Neutral / 80", className: "bg-neutral-80" },
          { label: "Neutral / 90", className: "bg-neutral-90" },
          { label: "Neutral / 100", className: "bg-neutral-100" },
        ]}
      />

      <Group
        title="Primary"
        items={[
          { label: "Primary / Main", className: "bg-primary" },
          { label: "Primary / Surface", className: "bg-primary-surface" },
          { label: "Primary / Border", className: "bg-primary-border" },
          { label: "Primary / Hover", className: "bg-primary-hover" },
          { label: "Primary / Pressed", className: "bg-primary-pressed" },
          { label: "Primary / Focus", className: "bg-primary-focus" },
        ]}
      />

      <Group
        title="Secondary"
        items={[
          { label: "Secondary / Main", className: "bg-secondary" },
          { label: "Secondary / Surface", className: "bg-secondary-surface" },
          { label: "Secondary / Border", className: "bg-secondary-border" },
          { label: "Secondary / Hover", className: "bg-secondary-hover" },
          { label: "Secondary / Pressed", className: "bg-secondary-pressed" },
          { label: "Secondary / Focus", className: "bg-secondary-focus" },
        ]}
      />

      <Group
        title="Warning"
        items={[
          { label: "Warning / Main", className: "bg-warning" },
          { label: "Warning / Surface", className: "bg-warning-surface" },
          { label: "Warning / Border", className: "bg-warning-border" },
          { label: "Warning / Hover", className: "bg-warning-hover" },
          { label: "Warning / Pressed", className: "bg-warning-pressed" },
          { label: "Warning / Focus", className: "bg-warning-focus" },
        ]}
      />

      <Group
        title="Success"
        items={[
          { label: "Success / Main", className: "bg-success" },
          { label: "Success / Surface", className: "bg-success-surface" },
          { label: "Success / Border", className: "bg-success-border" },
          { label: "Success / Hover", className: "bg-success-hover" },
          { label: "Success / Pressed", className: "bg-success-pressed" },
          { label: "Success / Focus", className: "bg-success-focus" },
        ]}
      />

      <Group
        title="Danger"
        items={[
          { label: "Danger / Main", className: "bg-danger" },
          { label: "Danger / Surface", className: "bg-danger-surface" },
          { label: "Danger / Border", className: "bg-danger-border" },
          { label: "Danger / Pressed", className: "bg-danger-pressed" },
        ]}
      />
    </div>
  );
};

export default ColorPalette;