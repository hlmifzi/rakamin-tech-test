"use client";
import React, { useEffect, useRef } from "react";
import { Toast } from "@rakamin/ui";
import { AnimatePresence } from "framer-motion";
import { useToastStore } from "../../lib/store/toastStore";

export const ToastRoot: React.FC = () => {
  const { open, message, variant, hide } = useToastStore();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        hide();
        timerRef.current = null;
      }, 4000);
    }
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [open, hide]);

  return (
    <AnimatePresence>
      {open && (
        <Toast message={message} variant={variant} onClose={hide} />
      )}
    </AnimatePresence>
  );
};

export default ToastRoot;