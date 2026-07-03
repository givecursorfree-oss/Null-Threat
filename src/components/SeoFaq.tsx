import { faqItems } from "@/seo/faq";
import { SectionReveal } from "./SectionReveal";

export default function SeoFaq() {
  return (
    <section
      id="faq"
      className="section-gap border-t border-white/10 bg-ink"
      aria-labelledby="faq-heading"
    >
      <div className="container-page max-w-3xl">
        <SectionReveal>
          <h2 id="faq-heading" className="mb-8 text-heading font-semibold tracking-tight text-snow">
            Frequently asked questions
          </h2>
          <dl className="space-y-6">
            {faqItems.map(({ question, answer }) => (
              <div
                key={question}
                className="rounded-2xl border border-white/10 bg-obsidian/60 p-6"
              >
                <dt className="text-body-lg font-semibold text-snow">{question}</dt>
                <dd className="mt-2 text-body leading-relaxed text-ash">{answer}</dd>
              </div>
            ))}
          </dl>
        </SectionReveal>
      </div>
    </section>
  );
}
