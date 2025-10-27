"use client";
import { create } from "zustand";

export type ToastVariant = "success" | "danger";

type ToastState = {
  open: boolean;
  message: string;
  variant: ToastVariant;
  showToast: (message: string, variant?: ToastVariant) => void;
  hide: () => void;
};

export const useToastStore = create<ToastState>((set) => ({
  open: false,
  message: "",
  variant: "success",
  showToast: (message: string, variant: ToastVariant = "success") =>
    set({ open: true, message, variant }),
  hide: () => set({ open: false }),
}));

// Convenience function for non-hook usage
export const showToast = (message: string, variant: ToastVariant = "success") => {
  useToastStore.getState().showToast(message, variant);
};