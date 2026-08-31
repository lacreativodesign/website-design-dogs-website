import { BrandIcon, type BrandIconName } from "@/components/ui/icon";
import type { Platform } from "@/content/platforms";

const categoryIcons: Record<Platform["category"], BrandIconName> = {
  "Website & CMS": "blocks",
  "E-Commerce": "shopping-cart",
  Custom: "code-2",
};

export function PlatformGlyph({ category }: { category: Platform["category"] }) {
  return (
    <BrandIcon
      name={categoryIcons[category]}
      className="platform-name-grid__icon"
      size={20}
    />
  );
}
