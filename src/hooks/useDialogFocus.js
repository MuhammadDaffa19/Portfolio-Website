import { useEffect } from "react";

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function getFocusable(container) {
  return [...container.querySelectorAll(FOCUSABLE)].filter(
    (element) =>
      !element.closest("[inert]") &&
      element.getClientRects().length > 0 &&
      window.getComputedStyle(element).visibility !== "hidden"
  );
}

/**
 * Traps keyboard focus in a mounted dialog. `suspended` lets a nested dialog
 * take over without unmounting the parent or stealing focus on its return.
 * The dialog must be rendered outside the inert application root.
 */
export function useDialogFocus({
  active,
  suspended = false,
  dialogRef,
  initialFocusRef,
  restoreFocusRef,
  onEscape,
}) {
  useEffect(() => {
    if (!active) return;

    const previousFocus = restoreFocusRef?.current ?? document.activeElement;
    (initialFocusRef.current ?? dialogRef.current)?.focus({ preventScroll: true });

    return () => {
      if (previousFocus?.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, [active, dialogRef, initialFocusRef, restoreFocusRef]);

  useEffect(() => {
    if (!active || suspended) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onEscape();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const elements = getFocusable(dialogRef.current);
      if (!elements.length) {
        event.preventDefault();
        dialogRef.current.focus({ preventScroll: true });
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];
      const current = document.activeElement;

      if (!dialogRef.current.contains(current)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [active, suspended, dialogRef, onEscape]);
}
