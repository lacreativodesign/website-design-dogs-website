"use client";

import { useContext } from "react";
import { ThemeContext } from "./theme-provider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const context = useContext(ThemeContext);
  const theme = context?.theme ?? "dark";
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";
  return (
    <button type="button" className={`theme-toggle ${className}`} aria-label={label} title={label} onClick={context?.toggleTheme}>
      <span aria-hidden="true" className="theme-toggle__track">
        <span className="theme-toggle__thumb">{isDark ? <MoonIcon /> : <SunIcon />}</span>
      </span>
    </button>
  );
}

function SunIcon() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>; }
function MoonIcon() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a7 7 0 1 0 11 11Z"/></svg>; }
