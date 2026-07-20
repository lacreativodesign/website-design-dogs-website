"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import type { PortfolioConcept } from "@/content/portfolio";

export function PortfolioGallery({ concepts, className = "" }: { concepts: readonly PortfolioConcept[]; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);
  const active = activeIndex === null ? null : concepts[activeIndex];
  const close = useCallback(() => {
    dialogRef.current?.close();
    setActiveIndex(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const move = useCallback((delta: number) => setActiveIndex((current) => current === null ? current : (current + delta + concepts.length) % concepts.length), [concepts.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || activeIndex === null) return;
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [activeIndex, close, move]);

  useEffect(() => {
    if (activeIndex === null) return;
    [-1, 1].forEach((offset) => { const preload = new window.Image(); preload.src = concepts[(activeIndex + offset + concepts.length) % concepts.length].image; });
  }, [activeIndex, concepts]);

  return <>
    <div className={`portfolio-image-grid ${className}`}>
      {concepts.map((concept, index) => <button key={concept.id} type="button" className="portfolio-thumbnail" data-concept-id={concept.id} aria-label={`Open ${concept.title}`} onClick={(event) => { triggerRef.current = event.currentTarget; setActiveIndex(index); }}>
        <Image src={concept.image} alt={`${concept.title} design concept`} fill sizes="(max-width: 599px) 100vw, (max-width: 899px) 50vw, (max-width: 1199px) 33vw, 25vw" className="portfolio-thumbnail__image" />
        <span aria-hidden="true" className="portfolio-thumbnail__overlay" />
      </button>)}
    </div>
    <dialog ref={dialogRef} className="portfolio-lightbox" aria-label="Portfolio image gallery" onClose={() => setActiveIndex(null)} onCancel={(event) => { event.preventDefault(); close(); }}>
      {active ? <div className="portfolio-lightbox__content" onTouchStart={(event: TouchEvent) => { touchStart.current = event.changedTouches[0]?.clientX ?? null; }} onTouchEnd={(event: TouchEvent) => { const start = touchStart.current; const end = event.changedTouches[0]?.clientX; if (start !== null && end !== undefined && Math.abs(end - start) > 40) move(end < start ? 1 : -1); touchStart.current = null; }}>
        <button type="button" className="portfolio-lightbox__close" onClick={close} aria-label="Close gallery">×</button>
        <button type="button" className="portfolio-lightbox__control portfolio-lightbox__control--previous" onClick={() => move(-1)} aria-label="Previous image">‹</button>
        <figure><Image src={active.image} alt={`${active.title} design concept`} width={1600} height={1067} sizes="100vw" priority className="portfolio-lightbox__image" /><figcaption><span aria-live="polite">{(activeIndex ?? 0) + 1} of {concepts.length}</span><strong>{active.title}</strong><p>{active.description}</p></figcaption></figure>
        <button type="button" className="portfolio-lightbox__control portfolio-lightbox__control--next" onClick={() => move(1)} aria-label="Next image">›</button>
      </div> : null}
    </dialog>
  </>;
}
