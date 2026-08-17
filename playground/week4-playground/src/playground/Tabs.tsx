import { useRef, useState, type KeyboardEvent } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  initialSelectedId?: string;
}

/**
 * Tabs — built from scratch against the ARIA APG "Tabs" pattern:
 * https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
 *
 * Requirements implemented:
 * - role="tablist" on the wrapper, role="tab" on each tab, role="tabpanel" on each panel
 * - aria-selected on tabs, aria-controls/id linking tab -> panel, aria-labelledby linking panel -> tab
 * - Roving tabindex: only the selected tab is in the Tab order (tabIndex 0), others are -1
 * - Arrow Left/Right move focus and selection between tabs (automatic activation), wrapping at the ends
 * - Home/End move focus to the first/last tab
 */
export function Tabs({ items, initialSelectedId }: TabsProps) {
  const [selectedId, setSelectedId] = useState<string>(initialSelectedId ?? items[0]?.id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const selectedIndex = items.findIndex((item) => item.id === selectedId);

  function selectByIndex(index: number) {
    const wrapped = (index + items.length) % items.length;
    const nextId = items[wrapped].id;
    setSelectedId(nextId);
    tabRefs.current[nextId]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        selectByIndex(selectedIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        selectByIndex(selectedIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        selectByIndex(0);
        break;
      case "End":
        event.preventDefault();
        selectByIndex(items.length - 1);
        break;
      default:
        break;
    }
  }

  return (
    <div className="tabs">
      <div role="tablist" aria-label="Playground tabs" className="tablist">
        {items.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                tabRefs.current[item.id] = el;
              }}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={isSelected}
              aria-controls={`panel-${item.id}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelectedId(item.id)}
              onKeyDown={handleKeyDown}
              className="tab"
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          hidden={item.id !== selectedId}
          tabIndex={0}
          className="tabpanel"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
