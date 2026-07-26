# AGENTS.md — Website Design Dogs

Repository: `lacreativodesign/website-design-dogs-website`.

## Locked Engineering Rules
- Always identify this repository as `lacreativodesign/website-design-dogs-website`.
- Use Next.js App Router, TypeScript, Tailwind CSS, and Vercel.
- Preserve a reusable component architecture.
- Prefer Server Components.
- Do not hard-code repeated content inside page components.
- Store services, packages, portfolio, industries, testimonials, and FAQs in structured content files.
- Run lint, type checking, and production build after meaningful changes.
- Fix errors before completing a task.
- Maintain responsive and accessible implementation standards.

## Locked Brand and Content Rules
- Never invent client logos, testimonials, portfolio results, awards, addresses, phone numbers, statistics, or business claims.
- Do not represent concept portfolio projects as real client projects.
- Website Design Dogs must be disclosed as a service brand of LA CREATIVO GROUP, LLC.
- Public launch is dark-theme only. Do not expose a light-theme toggle or honor a saved light-theme preference unless the founder explicitly approves a finished light experience.
- Final visual files will be placed under `public/brand`, `public/portfolio`, and `public/campaigns`.
- Do not rename approved asset files after they are introduced.
- Main website and campaign landing pages will show the same $499 one-time Starter Website price.
- The retired promotional price must not appear in public copy, metadata, schema, forms, analytics identifiers, legal copy, or tests.
- Do not render testimonial placeholders. Testimonials may return only after genuine, approved client feedback is available.
- There will be no separate Industries page; industries will appear as a homepage section.
- Essential legal pages planned for later are Privacy Policy, Terms and Conditions, Refund and Cancellation Policy, and Cookie Policy.

## Security and Integration Rules
- All future lead submissions will eventually route server-side to a Website Design Dogs tenant in Bizosto.
- Never expose Bizosto API keys or other secrets to browser code.
- Do not implement direct browser-to-Firestore lead writes.
- Do not commit secrets.
