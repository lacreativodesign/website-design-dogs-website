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

const revealAttributeSelector = '[data-reveal="true"]';

function reveal(element: HTMLElement, observer: IntersectionObserver | null) {
  element.classList.add("is-revealed");
  observer?.unobserve(element);
}

function decorate(root: ParentNode, observer: IntersectionObserver | null) {
  const elements = Array.from(root.querySelectorAll<HTMLElement>(revealSelectors));
  if (root instanceof HTMLElement && root.matches(revealSelectors)) elements.unshift(root);

  elements.forEach((element, index) => {
    if (element.dataset.reveal) return;
    element.dataset.reveal = "true";
    element.style.setProperty("--reveal-delay", `${Math.min(index % 5, 4) * 65}ms`);
    if (observer) observer.observe(element);
    else reveal(element, observer);
  });
}

function revealReachedElements(observer: IntersectionObserver | null) {
  const revealLine = window.innerHeight * 1.08;
  const elements = document.querySelectorAll<HTMLElement>(
    `${revealAttributeSelector}:not(.is-revealed)`,
  );

  for (const element of elements) {
    const bounds = element.getBoundingClientRect();
    if (bounds.top <= revealLine || bounds.bottom < 0) reveal(element, observer);
  }
}

function revealAll(observer: IntersectionObserver | null) {
  const elements = document.querySelectorAll<HTMLElement>(
    `${revealAttributeSelector}:not(.is-revealed)`,
  );
  for (const element of elements) reveal(element, observer);
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
              reveal(entry.target as HTMLElement, observer);
            }
          },
          { rootMargin: "0px 0px -8%", threshold: 0.08 },
        );

    let visibilityFrame: number | null = null;
    const scheduleVisibilityCheck = () => {
      if (visibilityFrame !== null) return;
      visibilityFrame = window.requestAnimationFrame(() => {
        visibilityFrame = null;
        revealReachedElements(observer);
      });
    };

    // Content must never stay transparent if an observer callback is skipped or delayed.
    // The scroll check catches rapid page jumps; the timeout is the final fail-open guard.
    const failOpenTimer = window.setTimeout(() => revealAll(observer), 3_000);

    decorate(document, observer);
    document.documentElement.classList.add("motion-ready");
    scheduleVisibilityCheck();
    window.addEventListener("scroll", scheduleVisibilityCheck, { passive: true });
    window.addEventListener("resize", scheduleVisibilityCheck);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof HTMLElement) {
            decorate(node, observer);
            scheduleVisibilityCheck();
          }
        }
      }
    });
    const main = document.querySelector("main");
    if (main) mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(failOpenTimer);
      window.removeEventListener("scroll", scheduleVisibilityCheck);
      window.removeEventListener("resize", scheduleVisibilityCheck);
      if (visibilityFrame !== null) window.cancelAnimationFrame(visibilityFrame);
      mutationObserver.disconnect();
      observer?.disconnect();
      revealAll(null);
      document.documentElement.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
