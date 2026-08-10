import { cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

type FieldControlProps = {
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  const describedBy = [
    isValidElement<FieldControlProps>(children) ? children.props["aria-describedby"] : undefined,
    hint ? `${id}-hint` : undefined,
    error ? `${id}-error` : undefined,
  ].filter(Boolean).join(" ") || undefined;

  const control = isValidElement<FieldControlProps>(children)
    ? cloneElement(children, {
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className="form-field">
      <label htmlFor={id} className="block text-sm font-black">
        {label}{required ? <span className="text-[var(--color-primary-orange)]" aria-hidden="true"> *</span> : null}
        {required ? <span className="sr-only"> (required)</span> : null}
      </label>
      {hint ? <p id={`${id}-hint`} className="form-field__hint">{hint}</p> : null}
      <div className="mt-2">{control}</div>
      {error ? <p id={`${id}-error`} className="mt-2 text-sm font-bold text-orange-300">{error}</p> : null}
    </div>
  );
}

export const inputClass = cn(
  "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-foreground)] outline-none focus:border-[var(--color-primary-orange)]",
);

