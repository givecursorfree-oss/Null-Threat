import { type ReactNode } from "react";

export interface Footer7Link {
  label: string;
  href: string;
  external?: boolean;
}

export interface Footer7LinkGroup {
  title: string;
  links: Footer7Link[];
}

export interface Footer7Props {
  logo?: ReactNode;
  brandName?: string;
  badgeText?: string;
  headline?: string;
  backgroundImage?: string;
  centerIcon?: ReactNode;
  linkGroups?: Footer7LinkGroup[];
  brandWatermark?: string;
}

export function Footer7({
  logo,
  brandName = "Watermelon",
  badgeText = "Loved by Creators",
  headline = "Fresh insights, tutorials, and updates delivered to your inbox.",
  backgroundImage,
  linkGroups = [],
  brandWatermark,
}: Footer7Props) {
  return (
    <footer className="relative w-full overflow-hidden">
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
        />
      )}

      <div className="relative z-10">
        <div className="mx-auto max-w-7xl px-[var(--page-gutter)] sm:px-12">
          <div className="pb-10 pt-6 lg:pb-14 lg:pt-10">
            <div className="flex w-full max-w-2xl flex-col gap-5">
              {badgeText && (
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4202] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4202]" />
                  </span>
                  <span className="text-sm font-medium text-white">{badgeText}</span>
                </div>
              )}
              <h2 className="text-2xl font-light leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl xl:text-5xl">
                {headline}
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-10 pb-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-1 items-center gap-3 lg:pt-1">
              {logo && (
                <div className="flex h-6 w-6 shrink-0 items-center justify-center text-white [&>svg]:h-full [&>svg]:w-full">
                  {logo}
                </div>
              )}
              <span className="text-base font-medium tracking-tight text-white">{brandName}</span>
            </div>

            {linkGroups.length > 0 && (
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-16">
                {linkGroups.map((group, groupIndex) => (
                  <div key={groupIndex} className="flex flex-col gap-4">
                    <span className="text-sm font-medium uppercase tracking-wide text-white/90">
                      {group.title}
                    </span>
                    <ul className="flex flex-col gap-3">
                      {group.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="text-sm text-white/70 transition-colors hover:text-white"
                            {...(link.external
                              ? {
                                  target: "_blank",
                                  rel: "noreferrer",
                                  "aria-label": `${link.label} (opens in new tab)`,
                                }
                              : {})}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {brandWatermark && (
          <div className="flex w-full items-center justify-center">
            <svg
              className="h-auto w-full select-none transition-colors duration-300"
              viewBox={`0 0 ${Math.max(brandWatermark.length * 90, 400)} 110`}
              preserveAspectRatio="xMidYMid meet"
              aria-label={brandWatermark}
            >
              <text
                x="50%"
                y="105"
                dominantBaseline="alphabetic"
                textAnchor="middle"
                textLength="90%"
                lengthAdjust="spacing"
                className="fill-white/30 font-sans font-bold tracking-tighter"
                fontSize="160"
              >
                {brandWatermark}
              </text>
            </svg>
          </div>
        )}
      </div>
    </footer>
  );
}
