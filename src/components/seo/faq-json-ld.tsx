import { JsonLd } from "./json-ld";
export function FaqJsonLd({ items }: { items: readonly { question: string; answer: string }[] }) { return <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) }} />; }
