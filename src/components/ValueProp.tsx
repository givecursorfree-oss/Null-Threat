import { EyeIcon, LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const items = [
  {
    icon: ShieldCheckIcon,
    title: "Verify before you trust",
    body: "Hash, signature, and behavioral checks run locally on every file.",
  },
  {
    icon: EyeIcon,
    title: "See what each engine found",
    body: "Review the 0-100 risk score, quarantine threats to an encrypted vault, or export reports.",
  },
  {
    icon: LockClosedIcon,
    title: "Keep data on your machine",
    body: "No uploads, no accounts, no vendor dashboards. Your files never leave the device.",
  },
];

export default function ValueProp() {
  return (
    <section className="section-gap bg-ink">
      <div className="container-page grid gap-8 md:grid-cols-3">
        {items.map(({ icon: Icon, title, body }) => (
          <article key={title} className="card-muted">
            <Icon className="mb-4 h-6 w-6 text-ember" aria-hidden />
            <h3 className="text-subheading font-semibold text-snow">{title}</h3>
            <p className="mt-2 text-body text-ash">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
