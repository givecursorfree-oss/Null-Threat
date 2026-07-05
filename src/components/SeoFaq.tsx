import { faqItems } from "@/seo/faq";
import { Faq1 } from "@/components/ui/faq-1";

export default function SeoFaq() {
  return (
    <section id="faq" className="border-t border-white/10 bg-background" aria-labelledby="faq-heading">
      <Faq1
        badge="Frequently asked questions"
        title={
          <>
            Got questions about Null Threat?
            <br className="hidden sm:block" />
            We&apos;ve got answers.
          </>
        }
        faqs={faqItems.map((faq, index) => ({
          id: `faq-${index + 1}`,
          question: faq.question,
          answer: faq.answer,
        }))}
      />
    </section>
  );
}
