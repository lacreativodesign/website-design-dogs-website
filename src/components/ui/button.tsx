import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode; href?: string; type?: "button" | "submit" | "reset"; variant?: "primary" | "secondary" | "outline" | "ghost"; size?: "small" | "medium" | "large"; disabled?: boolean; className?: string; icon?: React.ReactNode; iconPosition?: "left" | "right"; fullWidthMobile?: boolean;
};
const variants = { primary: "btn-primary", secondary: "btn-secondary", outline: "btn-outline", ghost: "btn-ghost" };
const sizes = { small: "btn-small", medium: "btn-medium", large: "btn-large" };
export function Button({ children, href, type = "button", variant = "primary", size = "medium", disabled = false, className, icon, iconPosition = "right", fullWidthMobile = false }: ButtonProps) {
  const classes = cn("btn", variants[variant], sizes[size], fullWidthMobile && "w-full sm:w-auto", disabled && "btn-disabled", className);
  const content = <>{icon && iconPosition === "left" ? <span aria-hidden="true">{icon}</span> : null}<span>{children}</span>{icon && iconPosition === "right" ? <span aria-hidden="true">{icon}</span> : null}</>;
  if (href) return <Link href={disabled ? "#" : href} aria-disabled={disabled} tabIndex={disabled ? -1 : undefined} className={classes}>{content}</Link>;
  return <button type={type} disabled={disabled} className={classes}>{content}</button>;
}
