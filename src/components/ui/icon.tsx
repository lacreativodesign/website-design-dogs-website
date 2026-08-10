type BrandIconName =
  | "smartphone"
  | "clipboard-check"
  | "mouse-pointer-click"
  | "heart-handshake"
  | "search"
  | "pen-tool"
  | "code-2"
  | "rocket"
  | "trending-up"
  | "house"
  | "briefcase-business"
  | "heart-pulse"
  | "utensils-crossed"
  | "shopping-bag"
  | "building-2"
  | "palette"
  | "map-pin-house"
  | "brush"
  | "gauge"
  | "search-check"
  | "shield-check"
  | "headset"
  | "globe-2"
  | "blocks"
  | "shopping-cart";

export type { BrandIconName };

type BrandIconProps = {
  name: BrandIconName;
  className?: string;
  size?: number;
};

export function BrandIcon({ name, className, size = 24 }: BrandIconProps) {
  let paths: React.ReactNode;

  switch (name) {
    case "smartphone":
      paths = <><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></>;
      break;
    case "clipboard-check":
      paths = <><rect width="16" height="18" x="4" y="4" rx="2"/><path d="M9 2h6a2 2 0 0 1 2 2v2H7V4a2 2 0 0 1 2-2Z"/><path d="m9 14 2 2 4-4"/></>;
      break;
    case "mouse-pointer-click":
      paths = <><path d="m9 9 6 12 2.2-5.1L22 14Z"/><path d="M9 3V1M5.2 5.2 3.8 3.8M3 9H1M14.8 5.2l1.4-1.4"/></>;
      break;
    case "heart-handshake":
      paths = <><path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.3 0-2.6.6-3.5 1.5C13.1 4.6 11.8 4 10.5 4A4.5 4.5 0 0 0 6 8.5c0 .6.1 1.2.3 1.7"/><path d="m12 5-5.3 5.3a2.4 2.4 0 0 0 0 3.4l4.6 4.6a2.4 2.4 0 0 0 3.4 0L19 14"/><path d="m7 13-2-2a2 2 0 0 0-3 3l3 3M15 13l-3-3M17 15l-3-3"/></>;
      break;
    case "search":
      paths = <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>;
      break;
    case "pen-tool":
      paths = <><path d="m12 19 7-7 3 3-7 7-3-3Z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18"/><path d="m2 2 7.6 7.6"/><circle cx="11" cy="11" r="2"/></>;
      break;
    case "code-2":
      paths = <><path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/></>;
      break;
    case "rocket":
      paths = <><path d="M4.5 16.5c-1.5 1.3-2 5-2 5s3.7-.5 5-2c.8-.9.8-2.3-.1-3.1a2.2 2.2 0 0 0-2.9.1Z"/><path d="m9 15-3-3s.5-3 2-4.5C10 5.5 14 4 19.5 4.5 20 10 18.5 14 16.5 16c-1.5 1.5-4.5 2-4.5 2Z"/><path d="M9 15H4s0-3 1.5-4.5S10 9 10 9M12 18v5s3 0 4.5-1.5S18 17 18 17"/><circle cx="15" cy="9" r="1"/></>;
      break;
    case "trending-up":
      paths = <><path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/></>;
      break;
    case "house":
      paths = <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10M9 20v-6h6v6"/></>;
      break;
    case "briefcase-business":
      paths = <><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M2 12h20"/></>;
      break;
    case "heart-pulse":
      paths = <><path d="M19 14c1.5-1.5 3-3.2 3-5.5A4.5 4.5 0 0 0 17.5 4c-1.6 0-3.1.9-4 2.2C12.6 4.9 11.1 4 9.5 4A4.5 4.5 0 0 0 5 8.5c0 .9.2 1.7.6 2.5"/><path d="M3 12h4l2-4 4 9 2-5h6"/><path d="M7 17c2 2 4.2 3.8 5 4.5.6-.5 1.8-1.5 3.1-2.7"/></>;
      break;
    case "utensils-crossed":
      paths = <><path d="m16 2-5 5 3 3 5-5M15 7l-8.5 8.5a2.1 2.1 0 0 0 3 3L18 10"/><path d="m2 3 7 7M3 2l8 8-3 3-4-4c-2-2-2-5-1-7Z"/><path d="m14 14 6 6"/></>;
      break;
    case "shopping-bag":
      paths = <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/></>;
      break;
    case "building-2":
      paths = <><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/></>;
      break;
    case "palette":
      paths = <><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2a10 10 0 1 0 10 10c0-1.1-.9-2-2-2h-1.2a2.4 2.4 0 0 0-1.7 4.1l.4.4a2.4 2.4 0 0 1-1.7 4.1H14a2 2 0 0 1-2-2v-.5a2 2 0 0 0-2-2H7.5A5.5 5.5 0 0 1 2 8.5 6.5 6.5 0 0 1 8.5 2Z"/></>;
      break;
    case "map-pin-house":
      paths = <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><path d="m8 10 4-3 4 3v4H8Z"/><path d="M11 14v-3h2v3"/></>;
      break;
    case "brush":
      paths = <><path d="m9.1 14.9 9.5-9.5a2.1 2.1 0 0 1 3 3l-9.5 9.5"/><path d="M14.7 12.3 11.7 9.3"/><path d="M9 13c-4 0-7 2-7 6 0 1.7 1.3 3 3 3 4 0 6-3 6-7Z"/></>;
      break;
    case "gauge":
      paths = <><path d="m12 14 4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/><path d="M5.6 16h.01M18.4 16h.01M12 6v.01"/></>;
      break;
    case "search-check":
      paths = <><path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></>;
      break;
    case "shield-check":
      paths = <><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"/><path d="m9 12 2 2 4-4"/></>;
      break;
    case "headset":
      paths = <><path d="M4 14a8 8 0 0 1 16 0"/><path d="M18 19c0 1.7-1.3 3-3 3h-3"/><path d="M4 14h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 1-2ZM20 14h-3v6h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-1-2Z"/></>;
      break;
    case "globe-2":
      paths = <><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20M12 2a15.3 15.3 0 0 0 0 20"/></>;
      break;
    case "blocks":
      paths = <><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/><path d="M14 17.5h7M17.5 14v7"/></>;
      break;
    case "shopping-cart":
      paths = <><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2H4l2.66 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L20 6H5.12"/></>;
      break;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths}
    </svg>
  );
}

export function ArrowRightIcon() { return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>; }
export function MenuIcon() { return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>; }
export function CloseIcon() { return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18"/></svg>; }

export function SocialIcon({ name }: { name: "facebook" | "instagram" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "facebook" ? (
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z" />
      ) : (
        <>
          <rect width="18" height="18" x="3" y="3" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
}
