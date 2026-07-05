import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";
import { SectionReveal } from "./SectionReveal";

type Slide = {
  quote: string;
  name: string;
  role: string;
  image: string;
  imageAlt: string;
};

const slides: Slide[] = [
  {
    quote:
      "Null Threat's Deep Analysis pipeline is the first scanner where I can expand Identity, Structure, Metadata, and Steg checks in one view. Video-safe rules stopped our MP4 assets from false-flagging — that alone saved hours every week.",
    name: "Morgan Reyes",
    role: "Security developer · open-source contributor",
    image:
      "https://framerusercontent.com/images/kGRXmPgNLheyYnLNviR2Ox60ww.jpg?width=640&height=960",
    imageAlt: "Portrait of Morgan Reyes, security developer",
  },
  {
    quote:
      "I audit every engine locally before recommending a tool to clients. Four offline stages, expandable findings, and GPL v3 source — Null Threat is what I wanted ClamAV's workflow to feel like on the desktop.",
    name: "Priya Nair",
    role: "Application security engineer",
    image:
      "https://framerusercontent.com/images/LvFy9Ekh799A2oZ4V1JYYlAf8Q.jpg?width=1024&height=576",
    imageAlt: "Portrait of Priya Nair, application security engineer",
  },
  {
    quote:
      "Folder watch plus quarantine with a transparent risk score changed how our team handles downloads. No cloud upload, no black-box verdict — just evidence I can export for incident review.",
    name: "Alex Kim",
    role: "DevSecOps lead",
    image:
      "https://framerusercontent.com/images/ugjY0fN5Emtyx5fj5Th3ceu2DuA.jpg?width=736&height=977",
    imageAlt: "Portrait of Alex Kim, DevSecOps lead",
  },
];

export default function DeveloperTestimonial() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  const go = useCallback(
    (direction: -1 | 1) => {
      setIndex((current) => (current + direction + slides.length) % slides.length);
    },
    []
  );

  return (
    <section
      id="testimonials"
      className="section-gap bg-ink"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-page">
        <SectionReveal>
          <div className="mb-10 max-w-2xl">
            <p className="text-caption font-medium uppercase tracking-[0.2em] text-ember mb-3">
              From developers
            </p>
            <h2
              id="testimonials-heading"
              className="text-heading font-semibold tracking-tight text-snow"
            >
              Built for people who read the findings
            </h2>
          </div>

          <div className="relative mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-card-compact border border-white/10 bg-obsidian/90 ring-1 ring-white/5 shadow-2xl backdrop-blur-md">
              <div className="grid min-h-[420px] md:grid-cols-[minmax(0,42%)_1fr] lg:min-h-[480px]">
                <div className="relative min-h-[220px] md:min-h-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={slide.image}
                      src={slide.image}
                      alt={slide.imageAlt}
                      width={640}
                      height={960}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={reducedMotion ? false : { opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                      transition={{ duration: reducedMotion ? 0 : 0.45, ease: [0, 0, 0.2, 1] }}
                      loading="lazy"
                      decoding="async"
                    />
                  </AnimatePresence>
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-obsidian/10 md:to-obsidian"
                    aria-hidden
                  />
                </div>

                <div className="relative flex flex-col justify-center p-8 md:p-10 lg:p-12">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.blockquote
                      key={slide.quote}
                      className="m-0"
                      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                      transition={{ duration: reducedMotion ? 0 : 0.4, ease: [0, 0, 0.2, 1] }}
                    >
                      <p className="text-body-lg md:text-xl leading-relaxed text-snow/95">
                        &ldquo;{slide.quote}&rdquo;
                      </p>
                      <footer className="mt-8 border-t border-white/10 pt-6">
                        <cite className="not-italic">
                          <span className="block text-body-lg font-semibold text-snow">
                            {slide.name}
                          </span>
                          <span className="mt-1 block text-body text-ash">{slide.role}</span>
                        </cite>
                      </footer>
                    </motion.blockquote>
                  </AnimatePresence>

                  <div
                    className="mt-8 flex items-center gap-3 md:absolute md:bottom-8 md:right-8 md:mt-0"
                    role="group"
                    aria-label="Testimonial navigation"
                  >
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous testimonial"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-snow transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-snow/70"
                    >
                      <ChevronLeftIcon className="h-5 w-5" aria-hidden />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next testimonial"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-snow transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-snow/70"
                    >
                      <ChevronRightIcon className="h-5 w-5" aria-hidden />
                    </button>
                    <span className="sr-only">
                      Testimonial {index + 1} of {slides.length}
                    </span>
                    <div className="ml-2 flex gap-1.5" aria-hidden>
                      {slides.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all duration-fast ${
                            i === index ? "w-6 bg-ember" : "w-1.5 bg-white/25"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
