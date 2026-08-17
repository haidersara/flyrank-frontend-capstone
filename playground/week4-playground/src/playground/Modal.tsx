import { useEffect, useRef, type ReactNode, type KeyboardEvent } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleId: string;
  title: string;
  children: ReactNode;
}

/**
 * Modal Dialog — built from scratch against the ARIA APG "Dialog (Modal)" pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 *
 * Requirements implemented:
 * - role="dialog" + aria-modal="true" + aria-labelledby pointing at the heading
 * - Focus moves into the dialog when it opens (first focusable element)
 * - Focus is trapped inside the dialog while open (Tab / Shift+Tab wrap)
 * - Escape closes the dialog
 * - Focus returns to the element that opened the dialog when it closes
 */
export function Modal({ isOpen, onClose, titleId, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Remember what had focus before we opened, so we can restore it on close.
      triggerElRef.current = document.activeElement as HTMLElement | null;

      // Move focus into the dialog. Prefer the first focusable element,
      // fall back to the dialog container itself.
      const focusable = getFocusableElements(dialogRef.current);
      (focusable[0] ?? dialogRef.current)?.focus();
    } else {
      // Return focus to whatever triggered the modal.
      triggerElRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
    if (!container) return [];
    const selector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(container.querySelectorAll<HTMLElement>(selector));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose();
      return;
    }

    if (event.key === "Tab") {
      const focusable = getFocusableElements(dialogRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      // Trap focus: wrap from last -> first, and first -> last.
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  return (
    <div className="modal-overlay" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id={titleId}>{title}</h2>
        {children}
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
