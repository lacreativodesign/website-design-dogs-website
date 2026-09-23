"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

export type WddSelectOption = {
  value: string;
  label: string;
  displayLabel?: string;
};

export function WddSelect({
  id,
  value,
  options,
  onChange,
  placeholder,
  ariaLabel,
  menuClassName = "",
  buttonClassName = "",
  "aria-invalid": invalid,
  "aria-describedby": describedBy,
}: {
  id: string;
  value: string;
  options: readonly WddSelectOption[];
  onChange: (value: string) => void;
  placeholder: string;
  ariaLabel?: string;
  menuClassName?: string;
  buttonClassName?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}) {
  const [open, setOpen] = useState(false);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const [activeIndex, setActiveIndex] = useState(
    selectedIndex >= 0 ? selectedIndex : 0,
  );
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = `${id}-listbox`;
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    }
  }, [open, selectedIndex]);

  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((index) => Math.min(index + 1, options.length - 1));
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setActiveIndex((index) => Math.max(index - 1, 0));
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(activeIndex);
      else setOpen(true);
      return;
    }

    if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <button
        id={id}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={
          open ? `${listboxId}-option-${activeIndex}` : undefined
        }
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={[
          "flex min-h-12 w-full min-w-0 items-center justify-between gap-3 rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-4 py-3 text-left text-[var(--color-foreground)] outline-none transition",
          open
            ? "border-[var(--color-primary-orange)] ring-1 ring-[rgb(255_106_0_/_0.24)]"
            : "border-[var(--color-border)] hover:border-[rgb(255_255_255_/_0.2)]",
          buttonClassName,
        ].join(" ")}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={onKeyDown}
      >
        <span
          className={
            selected
              ? "min-w-0 truncate"
              : "min-w-0 truncate text-[var(--color-text-muted)]"
          }
        >
          {selected?.displayLabel || selected?.label || placeholder}
        </span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className={[
            "h-4 w-4 shrink-0 text-[var(--color-text-muted)] transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
        >
          <path
            d="m5.5 7.5 4.5 4.5 4.5-4.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className={[
            "absolute left-0 top-[calc(100%+0.5rem)] z-[90] max-h-72 w-full min-w-full overflow-y-auto rounded-[var(--radius-md)] border border-[rgb(255_106_0_/_0.34)] bg-[#081a2f] p-1.5 shadow-[0_22px_60px_rgba(0,0,0,.45)]",
            menuClassName,
          ].join(" ")}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === activeIndex;

            return (
              <button
                key={option.value || "__empty"}
                id={`${listboxId}-option-${index}`}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={[
                  "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition",
                  isActive || isSelected
                    ? "bg-[rgb(255_106_0_/_0.14)] text-white"
                    : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-white",
                ].join(" ")}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(index)}
              >
                <span className="min-w-0 whitespace-normal">{option.label}</span>
                {isSelected ? (
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-primary-orange)]"
                  >
                    ✓
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
