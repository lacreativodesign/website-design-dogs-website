import type { Metadata } from "next";
import { ContactThankYouState } from "@/components/forms/contact-thank-you-state";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ArrowRightIcon, BrandIcon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Thank You",
  description: "Confirmation that Website Design Dogs received your enquiry.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <Section className="min-h-[68vh] flex items-center">
      <Container>
        <Card className="mx-auto max-w-3xl p-7 sm:p-10 lg:p-12">
          <div className="grid gap-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-accent-soft)] text-[var(--color-primary)]">
              <BrandIcon name="clipboard-check" />
            </div>
            <div className="grid gap-3">
              <p className="home-eyebrow">ENQUIRY RECEIVED</p>
              <h1>Thank you. Your enquiry is safely in.</h1>
              <p className="max-w-2xl text-[var(--color-text-muted)]">
                Website Design Dogs will review the details you submitted and
                follow up with a practical next step.
              </p>
            </div>

            <ContactThankYouState />

            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-section-alt)] p-5 sm:p-6">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--color-primary)]">
                What happens next
              </p>
              <p className="mt-2 text-[var(--color-text-muted)]">
                We review your requirements, clarify anything that is still
                open, and then recommend the most useful next step. There is no
                need to resubmit the form.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/" icon={<ArrowRightIcon />}>
                Back to Website Design Dogs
              </Button>
              <Button href="/portfolio" variant="outline">
                View Portfolio
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </Section>
  );
}
