import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  const placeholders = testimonials.length === 0 ? ["placeholder-1", "placeholder-2", "placeholder-3"] : testimonials.slice(0, 3).map((item) => item.id);
  return <section className="home-section home-testimonials" aria-labelledby="testimonials-title"><div className="mx-auto max-w-[var(--container-width)] px-5 sm:px-6 lg:px-8"><div className="home-section__heading home-section__heading--numbered"><span aria-hidden="true">05</span><div><p className="home-eyebrow">CLIENT TESTIMONIALS</p><h2 id="testimonials-title">Real Results. <em>Real Impact.</em></h2></div></div><div className="home-testimonials__grid">{placeholders.map((id) => <article key={id} className="home-testimonial-placeholder"><span aria-hidden="true">“</span><p>Verified client feedback will appear here.</p></article>)}</div></div></section>;
}
