"use client";
import React from "react";
import ToastRoot from "@/components/toast/ToastRoot";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastRoot />
    </>
  );
}