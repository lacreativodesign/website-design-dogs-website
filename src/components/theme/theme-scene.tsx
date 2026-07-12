import Image from "next/image";
import { cn } from "@/lib/utils";

type ThemeSceneProps = {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
};

export function ThemeScene({ darkSrc, lightSrc, alt, width, height, className, priority = false, sizes = "(max-width: 768px) 100vw, 50vw", quality = 88, objectFit = "cover", objectPosition = "center" }: ThemeSceneProps) {
  const imageClassName = cn("theme-scene__image", objectFit === "contain" && "theme-scene__image--contain");
  return (
    <span className={cn("theme-scene", className)}>
      <Image src={darkSrc} alt={alt} width={width} height={height} priority={priority} sizes={sizes} quality={quality} className={cn(imageClassName, "theme-scene__image-dark")} style={{ objectPosition }} />
      <Image src={lightSrc} alt="" aria-hidden="true" width={width} height={height} sizes={sizes} quality={quality} className={cn(imageClassName, "theme-scene__image-light")} style={{ objectPosition }} />
    </span>
  );
}
