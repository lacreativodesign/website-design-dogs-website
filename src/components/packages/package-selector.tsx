"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function PackageSelector() {
  const [selection, setSelection] = useState<"packages" | "custom">("packages");

  return (
    <div className="package-selector-wrap">
      <div className="package-selector" aria-label="Package category selector">
        <button
          type="button"
          className={selection === "packages" ? "package-selector__button package-selector__button--active" : "package-selector__button"}
          aria-pressed={selection === "packages"}
          onClick={() => setSelection("packages")}
        >
          Website Packages
        </button>
        <button
          type="button"
          className={selection === "custom" ? "package-selector__button package-selector__button--active" : "package-selector__button"}
          aria-pressed={selection === "custom"}
          onClick={() => setSelection("custom")}
        >
          Custom Projects
        </button>
      </div>
      {selection === "custom" ? (
        <div className="custom-project-notice" role="status">
          <p>Need a different scope, functionality, or website plan? Request a custom quote and we’ll review your requirements.</p>
          <Button href="/contact?package=custom">Request a Custom Quote</Button>
        </div>
      ) : null}
    </div>
  );
}
