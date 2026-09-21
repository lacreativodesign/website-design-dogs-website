"use client";

import { useRouter } from "next/navigation";

type TawkWindow = Window & {
  Tawk_API?: {
    maximize?: () => void;
    toggle?: () => void;
  };
};

export function LiveChatButton({
  className = "",
  label = "Questions? Start live chat",
}: {
  className?: string;
  label?: string;
}) {
  const router = useRouter();

  function openChat() {
    const tawk = (window as TawkWindow).Tawk_API;
    if (typeof tawk?.maximize === "function") {
      tawk.maximize();
      return;
    }
    if (typeof tawk?.toggle === "function") {
      tawk.toggle();
      return;
    }

    router.push("/contact?intent=live-chat");
  }

  return (
    <button
      type="button"
      onClick={openChat}
      className={className || "text-sm font-bold text-[var(--color-primary-orange)] underline underline-offset-4"}
    >
      {label}
    </button>
  );
}
