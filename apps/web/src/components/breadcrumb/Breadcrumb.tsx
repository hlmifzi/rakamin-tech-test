"use client";
import React from "react";
import Link from "next/link";
import { Typography, UilAngleRight } from "@rakamin/ui";
import { usePathname } from "next/navigation";

interface BreadcrumbProps {
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  labels?: Record<string, string>;
}

const defaultLabels: Record<string, string> = {
  "job-list": "Job List",
  "manage-candidate": "Manage Candidate",
};

export function Breadcrumb({
  className,
  linkClassName,
  activeClassName,
  labels = defaultLabels,
}: BreadcrumbProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumb items from known labels; ignore dynamic segments like IDs
  const items: { href: string; label: string }[] = [];
  let accumPath = "";
  for (const segment of segments) {
    accumPath += `/${segment}`;
    if (labels[segment]) {
      items.push({ href: accumPath, label: labels[segment] });
    }
  }

  if (!items.length) return null;

  const lastIndex = items.length - 1;

  return (
    <div className={className}>
      {items.map((item, index) => (
        <React.Fragment key={item.href}>
          {index < lastIndex ? (
            <Link href={item.href}>
              <Typography className={linkClassName} variant="TextMBold" as="span">
                {item.label}
              </Typography>
            </Link>
          ) : (
            <Typography className={activeClassName} variant="TextMBold" as="span">
              {item.label}
            </Typography>
          )}
          {index < lastIndex && <UilAngleRight />}
        </React.Fragment>
      ))}
    </div>
  );
}