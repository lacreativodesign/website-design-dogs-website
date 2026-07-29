import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";

export function PageCta({
  heading,
  body,
  cta,
  href,
}: {
  heading: string;
  body?: string;
  cta: string;
  href: string;
}) {
  return (
    <Section className="inner-page-cta-section">
      <Container>
        <div className="inner-page-cta">
          <div className="inner-page-cta__glow" aria-hidden="true" />
          <Badge>READY WHEN YOU ARE</Badge>
          <h2>{heading}</h2>
          {body ? <p>{body}</p> : null}
          <Button href={href} size="large" icon={<ArrowRightIcon />}>
            {cta}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
