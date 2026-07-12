import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

export default function NotFound() {
  return <Section><Container className="grid items-center gap-10 lg:grid-cols-[0.75fr_1fr]"><div><p className="text-6xl font-black tracking-[-0.06em] text-[var(--color-primary-orange)] sm:text-7xl">404</p><h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Page Not Found</h1><p className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-text-muted)]">Oops! The page you’re looking for wandered off or has been moved.</p><Button href="/" className="mt-8">Back to Home</Button></div><Card className="p-3"><ThemeScene darkSrc="/brand/scenes/404-hero-dark.webp" lightSrc="/brand/scenes/404-hero-light.webp" alt="Website Design Dogs explorer style 404 page scene" width={1600} height={1000} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3]" /></Card></Container></Section>;
}
