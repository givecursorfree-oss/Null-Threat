import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { BrandLockup } from "./BrandLockup";

const navLinks = [
  { href: "#platform", label: "Platform" },
  { href: "#engines", label: "Engines" },
  { href: "#features", label: "Features" },
  { href: "#opensource", label: "Source" },
];

const scrollSpySections = [
  ...navLinks.map((link) => link.href),
  "#download",
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>(navLinks[0].href);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sections = scrollSpySections
      .map((href) => document.querySelector(href) as HTMLElement | null)
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveHash(`#${visibleEntry.target.id}`);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-obsidian/85 backdrop-blur-md"
      role="banner"
    >
      <div className="container-page h-16 flex items-center justify-between">
        <a href="#hero" aria-label="Null Threat home" className="shrink-0">
          <BrandLockup size="nav" hideWordmarkOnMobile />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeHash === link.href ? "page" : undefined}
              className={`text-body font-medium transition-colors duration-fast ${
                activeHash === link.href ? "text-snow" : "text-ash hover:text-snow"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#opensource"
            className="text-body font-medium text-ash hover:text-snow hidden sm:inline-flex sm:items-center sm:gap-1.5 transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-snow/70 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian rounded-sm"
            aria-label="View source code"
          >
            Source
          </a>
          <a href="#download" className="btn-pill-primary !py-2.5 !px-5 !text-body hidden sm:inline-flex">
            Download
          </a>
          <button
            type="button"
            className="inline-flex sm:hidden min-h-[44px] min-w-[44px] items-center justify-center rounded-md border border-white/15 text-snow hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-snow/70 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <XMarkIcon className="h-[18px] w-[18px]" aria-hidden /> : <Bars3Icon className="h-[18px] w-[18px]" aria-hidden />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          className="sm:hidden border-t border-white/10 bg-obsidian/95"
          aria-label="Mobile"
        >
          <div className="container-page py-3">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={activeHash === link.href ? "page" : undefined}
                    className={`flex min-h-[44px] items-center rounded-md px-3 text-body transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-snow/70 ${
                      activeHash === link.href
                        ? "bg-white/10 text-snow"
                        : "text-ash hover:bg-white/5 hover:text-snow"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-1 border-t border-white/10 mt-1">
                <a
                  href="#opensource"
                  className="flex min-h-[44px] items-center gap-2 rounded-md px-3 text-body text-ash hover:bg-white/5 hover:text-snow transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-snow/70"
                  onClick={() => setMobileOpen(false)}
                >
                  Source
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="#download"
                  className="btn-pill-primary w-full !text-body"
                  onClick={() => setMobileOpen(false)}
                >
                  Download
                </a>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
