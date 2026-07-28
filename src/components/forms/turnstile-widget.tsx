"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export type TurnstileAction =
  | "contact_lead"
  | "quote_lead"
  | "campaign_lead";

type Props = {
  action: TurnstileAction;
  cData: string;
  onToken: (token: string) => void;
  resetKey: number;
};

export function TurnstileWidget({
  action,
  cData,
  onToken,
  resetKey,
}: Props) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const [message, setMessage] = useState("Anti-spam check loading.");

  useEffect(() => {
    if (!siteKey) return;

    const scriptId = "cf-turnstile-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    let cancelled = false;
    const timer = window.setInterval(() => {
      if (
        cancelled ||
        !window.turnstile ||
        !containerRef.current ||
        widgetIdRef.current
      ) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        theme: "dark",
        size: "flexible",
        appearance: "interaction-only",
        execution: "render",
        language: "auto",
        retry: "auto",
        "refresh-expired": "auto",
        "refresh-timeout": "auto",
        "response-field": false,
        action,
        cData,
        callback: (token: string) => {
          setMessage("Anti-spam check complete.");
          onToken(token);
        },
        "expired-callback": () => {
          setMessage("Anti-spam check expired. Checking again.");
          onToken("");
        },
        "timeout-callback": () => {
          setMessage("Anti-spam check timed out. Checking again.");
          onToken("");
        },
        "error-callback": () => {
          setMessage("Anti-spam check could not load. Please try again.");
          onToken("");
        },
        "unsupported-callback": () => {
          setMessage(
            "This browser cannot run the anti-spam check. Please use a current browser.",
          );
          onToken("");
        },
      });
      setMessage("Anti-spam check ready.");
    }, 100);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = undefined;
    };
  }, [action, cData, onToken, siteKey]);

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
      onToken("");
    }
  }, [onToken, resetKey]);

  if (!siteKey) return null;

  return (
    <div className="min-h-[4.1rem] w-full overflow-hidden [&>div]:w-full">
      <div ref={containerRef} />
      <p className="sr-only" aria-live="polite">
        {message}
      </p>
    </div>
  );
}
