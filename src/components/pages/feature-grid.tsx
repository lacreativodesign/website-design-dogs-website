import { Card } from "@/components/ui/card";
export function FeatureGrid({ items }: { items: readonly (readonly [string,string])[] }) { return <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(([title,body])=><Card key={title} hover><h3 className="text-xl font-black">{title}</h3><p className="mt-3 text-sm text-[var(--color-text-muted)]">{body}</p></Card>)}</div>; }
