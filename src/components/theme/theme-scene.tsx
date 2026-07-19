import { cn } from "@/lib/utils";

type ThemeSceneProps = {
  darkSrc: string; lightSrc: string; tabletDarkSrc?: string; tabletLightSrc?: string;
  mobileDarkSrc?: string; mobileLightSrc?: string; alt: string; width: number; height: number;
  className?: string; priority?: boolean; sizes?: string; objectFit?: "cover" | "contain"; objectPosition?: string;
};

/** A stable, CSS-only reservation for final hero artwork. */
export function ThemeScene({ className }: ThemeSceneProps) {
  return <div aria-hidden="true" className={cn("theme-scene", "theme-scene--placeholder", className)} />;
}
