import { Button } from "@/components/ui/button";
import { ThemeScene } from "@/components/theme/theme-scene";

export default function NotFound() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <ThemeScene
        darkSrc="/brand/scenes/404-hero-dark.webp"
        lightSrc="/brand/scenes/404-hero-light.webp"
        mobileDarkSrc="/brand/crops/mobile/404-dark.webp"
        mobileLightSrc="/brand/crops/mobile/404-light.webp"
        tabletDarkSrc="/brand/crops/tablet/404-dark.webp"
        tabletLightSrc="/brand/crops/tablet/404-light.webp"
        alt="Website Design Dogs explorer mascot in a moonlit mountain scene"
        width={1600}
        height={1000}
        priority
        sizes="100vw"
        className="not-found-page__scene"
      />
      <div className="not-found-page__moon" aria-hidden="true" />
      <div className="not-found-page__content">
        <p>404</p>
        <h1 id="not-found-title">Page Not Found</h1>
        <span>The page you’re looking for may have moved or no longer exists.</span>
        <Button href="/">Back to Home</Button>
      </div>
    </section>
  );
}
