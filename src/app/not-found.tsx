import { Button } from "@/components/ui/button";
import { ThemeScene } from "@/components/theme/theme-scene";
import { illustrationScenes } from "@/content/illustrations";

export default function NotFound() {
  return (
    <section className="not-found-page" aria-labelledby="not-found-title">
      <ThemeScene
        darkSrc={illustrationScenes.notFound.desktop.webp}
        darkAvifSrc={illustrationScenes.notFound.desktop.avif}
        tabletDarkSrc={illustrationScenes.notFound.tablet.webp}
        tabletDarkAvifSrc={illustrationScenes.notFound.tablet.avif}
        mobileDarkSrc={illustrationScenes.notFound.mobile.webp}
        mobileDarkAvifSrc={illustrationScenes.notFound.mobile.avif}
        alt="Border collie explorer finding the way back through a moonlit mountain landscape"
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
        <div className="not-found-page__actions">
          <Button href="/">Back to Home</Button>
          <Button href="/services" variant="outline">Explore Services</Button>
        </div>
      </div>
    </section>
  );
}
