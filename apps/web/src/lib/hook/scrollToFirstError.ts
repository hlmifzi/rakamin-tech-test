import { FieldErrors, FieldValues } from "react-hook-form";

/**
 * Scroll to the first error field by looking for an element with id pattern `${name}-wrapper`.
 * If not found, it will attempt to find the input by name attribute.
 */
export function scrollToFirstError(errors: FieldErrors<FieldValues>) {
  const entries = Object.entries(errors || {});
  if (!entries.length) return;
  const [name] = entries[0];

  const wrapperId = `${name}-wrapper`;
  const wrapperEl = document.getElementById(wrapperId);
  const targetEl =
    wrapperEl || (document.querySelector(`[name="${name}"]`) as HTMLElement | null);

  if (targetEl && typeof targetEl.scrollIntoView === "function") {
    targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    // Try to focus the first input inside wrapper, else focus the element itself
    const focusTarget = targetEl.querySelector?.("input, textarea, select") as
      | HTMLElement
      | null;
    (focusTarget || targetEl)?.focus?.();
  }
}

/**
 * Returns a handler suitable for react-hook-form's handleSubmit(onInvalid) to scroll to first error.
 */
export function useScrollToFirstError() {
  return (errors: FieldErrors<FieldValues>) => scrollToFirstError(errors);
}