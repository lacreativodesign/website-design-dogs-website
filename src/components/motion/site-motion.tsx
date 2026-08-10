"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelectors = [
  ".home-section__heading",
  ".final-section-heading",
  ".shared-proof-strip article",
  ".home-trust-strip article",
  ".home-service-final-card",
  ".home-process__grid article",
  ".home-industry-card",
  ".packages-card",
  ".value-benefit-tile",
  ".service-showcase-card",
  ".platform-card-grid article",
  ".portfolio-strategy article",
  ".portfolio-process article",
  ".optional-services-grid article",
  ".packages-process li",
  ".contact-method-card",
  ".coverage-panel__steps li",
  ".compact-cta-strip__inner",
  ".platform-decision-cta__panel",
].join(",");

function decorate(root: ParentNode, observer: IntersectionObserver | null) {
  const elements = Array.from(root.querySelectorAll<HTMLElement>(revealSelectors));
  elements.forEach((element, index) => {
    if (element.dataset.reveal) return;
    element.dataset.reveal = "true";
    element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 65}ms`);
    if (observer) observer.observe(element);
    else element.classList.add("is-revealed");
  });
}

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = reducedMotion
      ? null
      : new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              (entry.target as HTMLElement).classList.add("is-revealed");
              observer?.unobserve(entry.target);
            }
          },
          { rootMargin: "0px 0px -8%", threshold: 0.08 },
        );

    decorate(document, observer);
    document.documentElement.classList.add("motion-ready");

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) decorate(node, observer);
        }
      }
    });
    const main = document.querySelector("main");
    if (main) mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
