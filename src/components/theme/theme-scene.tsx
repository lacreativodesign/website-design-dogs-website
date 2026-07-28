import Image from "next/image";
import { cn } from "@/lib/utils";

type ThemeSceneProps = {
  darkSrc: string;
  lightSrc: string;
  tabletDarkSrc?: string;
  tabletLightSrc?: string;
  mobileDarkSrc?: string;
  mobileLightSrc?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

export function ThemeScene({
  darkSrc,
  tabletDarkSrc,
  mobileDarkSrc,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes = "100vw",
  objectFit = "cover",
  objectPosition,
}: ThemeSceneProps) {
  return (
    <picture className={cn("theme-scene", className)}>
      {mobileDarkSrc ? (
        <source media="(max-width: 640px)" srcSet={mobileDarkSrc} />
      ) : null}
      {tabletDarkSrc ? (
        <source
          media="(min-width: 641px) and (max-width: 1023px)"
          srcSet={tabletDarkSrc}
        />
      ) : null}
      <Image
        src={darkSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={cn(
          "theme-scene__image",
          objectFit === "contain" && "theme-scene__image--contain",
        )}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </picture>
  );
}
