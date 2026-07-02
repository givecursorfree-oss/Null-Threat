import { Logo } from "./Logo";

const groups = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Engines", href: "#engines" },
    { label: "Download", href: "#download" },
  ],
  Security: [
    { label: "Quarantine", href: "#platform" },
    { label: "Risk scores", href: "#engines" },
    { label: "YARA rules", href: "#engines" },
  ],
  Resources: [
    { label: "Open source", href: "#opensource" },
    { label: "Build guide", href: "https://github.com", external: true },
    { label: "License", href: "https://www.gnu.org/licenses/gpl-3.0.en.html", external: true },
  ],
  Community: [
    { label: "GitHub", href: "https://github.com", external: true },
    { label: "Issues", href: "https://github.com/issues", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="py-16 bg-obsidian border-t border-white/10">
      <div className="container-page">
        <div className="grid md:grid-cols-5 gap-10 mb-12">
          <div className="md:col-span-2">
            <Logo variant="full" className="mb-4" />
            <p className="max-w-xs text-body text-ash">
              Scan every file on your machine. Trust nothing until it&apos;s verified.
            </p>
          </div>
          {Object.entries(groups).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-body font-semibold text-snow mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body text-ash hover:text-snow transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-snow/70 focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian rounded-sm"
                      {...("external" in link && link.external
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
        <p className="text-caption text-ash">© 2026 Null Threat. GPL v3.</p>
      </div>
    </footer>
  );
}
