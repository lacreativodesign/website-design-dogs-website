import { testimonials } from "@/content/testimonials";

export function TestimonialsSection() {
  // The structured source is deliberately empty until the founder supplies
  // verified quote, attribution, and permission details.
  if (testimonials.length === 0) return null;
  return <section className="home-section" aria-labelledby="testimonials-title"><div className="mx-auto max-w-[var(--container-width)] px-5 sm:px-6 lg:px-8"><div className="home-section__heading"><p className="home-eyebrow">CLIENT FEEDBACK</p><h2 id="testimonials-title">What Clients Say</h2></div><div className="grid gap-5 md:grid-cols-3">{testimonials.slice(0, 3).map((testimonial) => <article key={testimonial.id} className="card"><h3>{testimonial.title}</h3></article>)}</div></div></section>;
}
