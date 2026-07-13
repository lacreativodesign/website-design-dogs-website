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

function ThemeImage({ src, alt, width, height, priority, sizes, className, objectPosition }: { src: string; alt: string; width: number; height: number; priority: boolean; sizes: string; className: string; objectPosition: string }) {
  return <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes={sizes} className={className} style={{ objectPosition }} />;
}

export function ThemeScene({ darkSrc, lightSrc, tabletDarkSrc, tabletLightSrc, mobileDarkSrc, mobileLightSrc, alt, width, height, className, priority = false, sizes = "(max-width: 768px) 100vw, 50vw", objectFit = "cover", objectPosition = "center" }: ThemeSceneProps) {
  const imageClassName = cn("theme-scene__image", objectFit === "contain" && "theme-scene__image--contain");
  const darkSources = [
    { src: darkSrc, className: "theme-scene__desktop" },
    tabletDarkSrc ? { src: tabletDarkSrc, className: "theme-scene__tablet" } : null,
    mobileDarkSrc ? { src: mobileDarkSrc, className: "theme-scene__mobile" } : null,
  ].filter((source): source is { src: string; className: string } => Boolean(source));
  const lightSources = [
    { src: lightSrc, className: "theme-scene__desktop" },
    tabletLightSrc ? { src: tabletLightSrc, className: "theme-scene__tablet" } : null,
    mobileLightSrc ? { src: mobileLightSrc, className: "theme-scene__mobile" } : null,
  ].filter((source): source is { src: string; className: string } => Boolean(source));

  return <span className={cn("theme-scene", className)}>{darkSources.map((source, index) => <ThemeImage key={`dark-${source.src}`} src={source.src} alt={index === 0 ? alt : ""} width={width} height={height} priority={priority && index === 0} sizes={sizes} className={cn(imageClassName, "theme-scene__image-dark", source.className)} objectPosition={objectPosition} />)}{lightSources.map((source) => <ThemeImage key={`light-${source.src}`} src={source.src} alt="" width={width} height={height} priority={false} sizes={sizes} className={cn(imageClassName, "theme-scene__image-light", source.className)} objectPosition={objectPosition} />)}</span>;
}
