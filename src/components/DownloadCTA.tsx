import { ArrowRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { GITHUB_RELEASES } from "@/seo/config";
import { platformIcons, type PlatformId } from "./icons/PlatformIcons";
import { SectionReveal } from "./SectionReveal";

const CTA_BACKGROUND_IMAGE = "/images/cta-download-bg.jpg";

const platforms: { id: PlatformId; label: string; href: string }[] = [
  { id: "windows", label: "Windows", href: GITHUB_RELEASES },
  { id: "macos", label: "macOS", href: GITHUB_RELEASES },
  { id: "linux", label: "Linux", href: GITHUB_RELEASES },
];

export default function DownloadCTA() {
  return (
    <section id="download" className="section-gap border-t border-white/10 bg-transparent text-snow">
      <div className="container-page">
        <SectionReveal variant="scale">
          <article className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-slate-900 ring-1 ring-white/10">
            <img
              src={CTA_BACKGROUND_IMAGE}
              alt=""
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10"
              aria-hidden
            />

            <div className="relative z-10 p-6 sm:p-8 md:p-12">
              <h2 className="max-w-3xl text-heading-sm font-semibold tracking-tight text-snow md:text-heading">
                Download Null Threat
              </h2>
              <p className="mt-3 max-w-2xl text-body-lg text-slate-300">
                Free forever under GPL v3. No account, no credit card, no cloud uploads.
              </p>

              <div className="mt-8">
                <a
                  href={platforms[0].href}
                  className="btn-pill-primary inline-flex min-h-[44px] gap-2"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Download Null Threat for Windows (opens GitHub in new tab)"
                >
                  Download for free
                  <ArrowRightIcon className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                </a>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="text-body font-medium text-slate-200">Available for</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {platforms.map(({ id, label, href }) => {
                    const Icon = platformIcons[id];
                    return (
                      <a
                        key={id}
                        href={href}
                        className="inline-flex min-h-[44px] items-center gap-2.5 rounded-pill border border-white/20 bg-white/10 px-5 py-2.5 text-body font-medium text-snow backdrop-blur-sm transition-colors duration-fast hover:border-white/30 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snow"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Download Null Threat for ${label} (opens GitHub in new tab)`}
                      >
                        <Icon size={20} className="text-snow" />
                        {label}
                        <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5 opacity-70" aria-hidden />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </article>
        </SectionReveal>
      </div>
    </section>
  );
}
