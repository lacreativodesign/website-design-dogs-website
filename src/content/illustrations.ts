const finalIllustrationBase = "/brand/illustrations/final";

function scene(slug: string) {
  return {
    desktop: {
      avif: `${finalIllustrationBase}/${slug}-desktop.avif`,
      webp: `${finalIllustrationBase}/${slug}-desktop.webp`,
    },
    tablet: {
      avif: `${finalIllustrationBase}/${slug}-tablet.avif`,
      webp: `${finalIllustrationBase}/${slug}-tablet.webp`,
    },
    mobile: {
      avif: `${finalIllustrationBase}/${slug}-mobile.avif`,
      webp: `${finalIllustrationBase}/${slug}-mobile.webp`,
    },
  } as const;
}

export const illustrationScenes = {
  home: scene("home"),
  services: scene("services"),
  portfolio: scene("portfolio"),
  about: scene("about"),
  contact: scene("contact"),
  getStarted: scene("get-started"),
  notFound: scene("404"),
} as const;

export const mascotDesigner = {
  avif: `${finalIllustrationBase}/mascot-designer.avif`,
  webp: `${finalIllustrationBase}/mascot-designer.webp`,
} as const;
