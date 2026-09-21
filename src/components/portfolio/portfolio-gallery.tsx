"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PortfolioConcept } from "@/content/portfolio";

type PortfolioGalleryVariant = "live" | "thumbnail";

export function PortfolioGallery({
  concepts,
  className = "",
  variant = "live",
}: {
  concepts: readonly PortfolioConcept[];
  className?: string;
  variant?: PortfolioGalleryVariant;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : concepts[activeIndex];

  const close = useCallback(() => {
    dialogRef.current?.close();
    setActiveIndex(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  const move = useCallback(
    (delta: number) =>
      setActiveIndex((current) =>
        current === null
          ? current
          : (current + delta + concepts.length) % concepts.length,
      ),
    [concepts.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || activeIndex === null) return;

    if (!dialog.open) dialog.showModal();
    requestAnimationFrame(() => closeRef.current?.focus());

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move(-1);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move(1);
      }
    };

    const onMessage = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframeRef.current?.contentWindow ||
        event.data?.type !== "wdd-concept-key"
      ) {
        return;
      }
      if (event.data.key === "Escape") close();
      if (event.data.key === "ArrowLeft") move(-1);
      if (event.data.key === "ArrowRight") move(1);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("message", onMessage);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("message", onMessage);
    };
  }, [activeIndex, close, move]);

  return (
    <>
      <div
        className={`portfolio-image-grid ${className}`}
        data-gallery-variant={variant}
      >
        {concepts.map((concept, index) => (
          <button
            key={concept.id}
            type="button"
            className={`portfolio-thumbnail${variant === "thumbnail" ? " portfolio-thumbnail--image" : ""}`}
            data-concept-id={concept.id}
            aria-label={`Open live ${concept.title}`}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActiveIndex(index);
            }}
          >
            {variant === "thumbnail" ? (
              <span className="portfolio-thumbnail__image-wrap" aria-hidden="true">
                <Image
                  src={concept.thumbnail}
                  alt=""
                  fill
                  sizes="(max-width: 599px) 92vw, (max-width: 899px) 45vw, 24vw"
                  className="portfolio-thumbnail__image"
                />
              </span>
            ) : (
              <span className="portfolio-thumbnail__preview" aria-hidden="true">
                <iframe
                  src={concept.liveUrl}
                  title={`${concept.brand} preview`}
                  tabIndex={-1}
                  loading="lazy"
                  className="portfolio-thumbnail__preview-frame"
                />
              </span>
            )}
            <span aria-hidden="true" className="portfolio-thumbnail__overlay" />
            <span className="portfolio-thumbnail__label">Concept Design</span>
            {variant === "thumbnail" ? (
              <span className="portfolio-thumbnail__meta" aria-hidden="true">
                <span>
                  <strong>{concept.brand}</strong>
                  <small>{concept.industries[0]}</small>
                </span>
                <b>↗</b>
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="portfolio-lightbox"
        aria-label="Interactive portfolio concept gallery"
        onClose={() => setActiveIndex(null)}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        {active ? (
          <div className="portfolio-lightbox__content">
            <p className="portfolio-lightbox__status sr-only" aria-live="polite">
              {(activeIndex ?? 0) + 1} of {concepts.length}: {active.title}
            </p>
            <iframe
              key={active.id}
              ref={iframeRef}
              src={active.liveUrl}
              title={`${active.brand} interactive website concept`}
              className="portfolio-lightbox__site"
            />
            <button
              ref={closeRef}
              type="button"
              className="portfolio-lightbox__close"
              onClick={close}
              aria-label="Close concept"
            >
              ×
            </button>
            <button
              type="button"
              className="portfolio-lightbox__control portfolio-lightbox__control--previous"
              onClick={() => move(-1)}
              aria-label="Previous concept"
            >
              ‹
            </button>
            <button
              type="button"
              className="portfolio-lightbox__control portfolio-lightbox__control--next"
              onClick={() => move(1)}
              aria-label="Next concept"
            >
              ›
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
