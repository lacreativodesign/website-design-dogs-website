import Image from "next/image";
import { cn } from "@/lib/utils";

type ThemeSceneProps = {
  darkSrc: string;
  darkAvifSrc?: string;
  lightSrc?: string;
  tabletDarkSrc?: string;
  tabletDarkAvifSrc?: string;
  tabletLightSrc?: string;
  mobileDarkSrc?: string;
  mobileDarkAvifSrc?: string;
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
  darkAvifSrc,
  tabletDarkSrc,
  tabletDarkAvifSrc,
  mobileDarkSrc,
  mobileDarkAvifSrc,
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
      {mobileDarkAvifSrc ? (
        <source
          media="(max-width: 640px)"
          type="image/avif"
          srcSet={mobileDarkAvifSrc}
        />
      ) : null}
      {mobileDarkSrc ? (
        <source
          media="(max-width: 640px)"
          type="image/webp"
          srcSet={mobileDarkSrc}
        />
      ) : null}
      {tabletDarkAvifSrc ? (
        <source
          media="(min-width: 641px) and (max-width: 1023px)"
          type="image/avif"
          srcSet={tabletDarkAvifSrc}
        />
      ) : null}
      {tabletDarkSrc ? (
        <source
          media="(min-width: 641px) and (max-width: 1023px)"
          type="image/webp"
          srcSet={tabletDarkSrc}
        />
      ) : null}
      {darkAvifSrc ? <source type="image/avif" srcSet={darkAvifSrc} /> : null}
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
