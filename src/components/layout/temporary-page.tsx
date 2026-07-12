import { ThemeScene } from "@/components/theme/theme-scene";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type TemporaryPageProps = { title: string; darkSrc?: string; lightSrc?: string; alt?: string };
export function TemporaryPage({ title, darkSrc, lightSrc, alt = "Website Design Dogs branded page scene" }: TemporaryPageProps) {
  return <Section><Container className="grid items-center gap-10 lg:grid-cols-[0.9fr_1fr]"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--color-primary-orange)]">Page in progress</p><h1 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">{title}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-[var(--color-text-muted)]">This page is being completed and will be replaced in a later Website Design Dogs implementation phase.</p><Button href="/" variant="outline" className="mt-8">Back to Home</Button></div><Card className="p-3">{darkSrc && lightSrc ? <ThemeScene darkSrc={darkSrc} lightSrc={lightSrc} alt={alt} width={1600} height={1000} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[4/3]" /> : <div className="grid aspect-[4/3] place-items-center rounded-[var(--radius-xl)] bg-[var(--color-section-alt)] p-8 text-center"><p className="max-w-sm text-lg font-bold text-[var(--color-text-muted)]">Website Design Dogs page content is being prepared.</p></div>}</Card></Container></Section>;
}
