import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/base-ui/accordion";
import { cn } from "@/lib/utils";
import { FaMinus, FaPlus } from "react-icons/fa";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  date?: string;
}

export interface Faq1Props {
  badge?: string;
  title: React.ReactNode;
  faqs: FaqItem[];
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
  className?: string;
}

export function Faq1({ badge, title, faqs, className }: Faq1Props) {
  return (
    <section className={cn("container-page w-full max-w-4xl py-12 sm:py-16", className)}>
      <div className="mb-12 flex flex-col items-center text-center">
        {badge && (
          <span className="bg-muted text-foreground mb-6 inline-flex items-center rounded-full px-3 py-1 text-sm font-medium">
            {badge}
          </span>
        )}
        <h2
          id="faq-heading"
          className="text-foreground max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl md:leading-tight"
        >
          {title}
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full gap-2">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            value={faq.id}
            className="rounded-none border border-dashed border-none bg-muted/50 px-4 sm:px-6"
          >
            <AccordionTrigger className="group flex items-center py-6 hover:no-underline [&_[data-slot=accordion-trigger-icon]]:!hidden">
              <span className="text-foreground pr-4 text-left text-base font-medium md:text-lg">
                {faq.question}
              </span>
              <div className="text-muted-foreground ml-auto flex shrink-0 items-center justify-center">
                <FaPlus className="block h-4 w-4 group-data-[state=open]:hidden" />
                <FaMinus className="hidden h-4 w-4 group-data-[state=open]:block" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-6 pt-0">
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                {faq.answer}
              </p>
              {faq.date && (
                <div className="text-muted-foreground/70 mt-4 text-sm font-medium">{faq.date}</div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
