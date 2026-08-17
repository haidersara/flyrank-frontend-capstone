import { useId, useState, type ReactNode } from "react";

interface DisclosureProps {
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Disclosure — built from scratch against the ARIA APG "Disclosure (Show/Hide)" pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 *
 * Requirements implemented:
 * - A native <button> as the trigger, so Enter/Space activation and focusability are free
 * - aria-expanded reflects open/closed state
 * - aria-controls points at the content region's id
 * - Content is removed from the accessibility tree (via `hidden`) when collapsed
 */
export function Disclosure({ summary, children, defaultOpen = false }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="disclosure">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
        className="disclosure-trigger"
      >
        <span aria-hidden="true" className={`disclosure-icon ${isOpen ? "open" : ""}`}>
          ▶
        </span>
        {summary}
      </button>
      <div id={contentId} role="region" hidden={!isOpen} className="disclosure-content">
        {children}
      </div>
    </div>
  );
}
