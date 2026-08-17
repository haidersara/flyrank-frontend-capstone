# Week 4 · Task 1 — Notes

## Setup note

`npx shadcn@latest init` and `add` both call out to `ui.shadcn.com`, which this sandbox's
network allowlist doesn't include (only npm/GitHub/PyPI/crates hosts are reachable here).
Since shadcn's `dialog` and `tabs` components are thin, mostly-unstyled wrappers around
`@radix-ui/react-dialog` and `@radix-ui/react-tabs`, I installed those Radix packages directly
from npm (reachable) and reproduced the wrapper files exactly as the CLI generates them —
`src/components/ui/dialog.tsx` and `src/components/ui/tabs.tsx`. Worth re-running the real CLI
once on a machine with normal network access, to confirm the registry hasn't drifted, but the
Radix internals below are read straight from the installed package source, not memory.

## What I built

`src/playground/` — hand-written, zero dependencies beyond React:

- `Modal.tsx` — dialog, ARIA APG "Dialog (Modal)" pattern
- `Tabs.tsx` — tabs, ARIA APG "Tabs" pattern (automatic activation, roving tabindex)
- `Disclosure.tsx` — disclosure, ARIA APG "Disclosure" pattern

All three keyboard-tested by hand: Tab/Shift+Tab, Escape, and Left/Right/Home/End on tabs.

## Gaps between my version and shadcn's (Radix-backed)

1. **Background isn't inert.** My modal traps *focus* via keydown handling, but a screen
   reader user navigating by swipe/virtual cursor (not Tab) can still land on content behind
   the overlay, because I never touch the rest of the DOM. Radix's dialog calls `hideOthers()`
   from the `aria-hidden` package on open, which sets `aria-hidden="true"` on every sibling of
   the dialog's root, then reverses it on close. That's a real gap in my version, not just a
   style difference — it's the difference between "focus can't tab there" and "assistive tech
   can't perceive it's there at all."

2. **Focus restoration is more careful about *how* it refocuses, not just *what*.** I call
   `triggerElRef.current?.focus()`. Radix's focus-scope calls `focus(element, { select: true })`
   — for text inputs/textareas this also re-selects the text, matching what a sighted mouse
   user would expect if they'd had text selected before the interaction. Small, but it's the
   kind of detail that's easy to miss by hand and easy to get "for free" from a maintained
   primitive.

3. **My focus trap re-queries focusable elements on every Tab press; Radix's is DOM-diff aware.**
   Looking at `@radix-ui/react-focus-scope`'s source, it uses a `MutationObserver` — if a node
   is removed from inside the trap while focus was on it, it explicitly refocuses the container
   rather than letting focus silently fall back to `<body>`. My implementation would lose the
   trap in that edge case (e.g. content that conditionally unmounts while the modal is open).

4. **Escape handling is a documented, overridable prop, not an inline `if`.** Radix's dialog
   content exposes `onEscapeKeyDown` and `onPointerDownOutside` as composable props, and
   pointer-outside dismissal explicitly checks `event.detail.originalEvent.type === "pointerdown"`
   so it doesn't also fire on synthetic/touch edge cases. Mine hard-codes both behaviors inline
   in `Modal.tsx` — functionally fine for this task, but not something a consumer of the
   component could opt out of (e.g. a "confirm before closing" dialog) without editing the
   source.

5. **Tabs: mine hard-codes automatic activation; Radix supports both.** The APG pattern allows
   either automatic activation (arrow keys move focus *and* select) or manual activation (arrow
   keys move focus, Enter/Space selects). I only implemented automatic, which is fine — it's
   the more common choice and what I tested — but Radix's `Tabs` takes an `activationMode` prop
   so consumers can choose. That's a real feature gap, not just extra polish.

## What I did *not* find missing

Roles, `aria-selected`/`aria-controls`/`aria-labelledby` wiring on tabs, `aria-expanded` on the
disclosure trigger, and `role="dialog"` + `aria-modal` + `aria-labelledby` on the modal all match
between my version and Radix's — the base semantics were the easy 80%. The gaps above are all in
the harder 20%: what happens at the edges (unmounting nodes, non-Tab navigation, touch events)
rather than the happy path.
