import {
  CircleStackIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  SignalSlashIcon,
} from "@heroicons/react/24/outline";
import { SectionReveal } from "./SectionReveal";

const items = [
  { icon: ShieldCheckIcon, label: "GPL v3" },
  { icon: CircleStackIcon, label: "500K+ signatures" },
  { icon: LockClosedIcon, label: "AES-256 quarantine" },
  { icon: SignalSlashIcon, label: "100% offline" },
];

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-white/10 bg-ink" aria-label="Trust indicators">
      <div className="container-page">
        <SectionReveal>
          <div className="flex flex-wrap justify-center gap-4">
            {items.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="badge-dark min-h-[44px] gap-2.5 !px-5 !py-2.5 !text-body !font-medium"
              >
                <Icon className="h-5 w-5 shrink-0 text-ash" aria-hidden />
                {label}
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
