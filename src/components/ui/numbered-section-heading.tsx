import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  number: string;
  eyebrow: string;
  title: ReactNode;
  id: string;
  description?: ReactNode;
  className?: string;
};

export function NumberedSectionHeading({
  number,
  eyebrow,
  title,
  id,
  description,
  className,
}: Props) {
  return (
    <header className={cn("home-section__heading home-section__heading--numbered", className)}>
      <span aria-hidden="true">{number}</span>
      <div>
        <p className="home-eyebrow">{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        {description ? <div className="numbered-section-description">{description}</div> : null}
      </div>
    </header>
  );
}
