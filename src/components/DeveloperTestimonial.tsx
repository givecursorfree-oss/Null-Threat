import {
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";
import BadHandwriting from "@/framer/Bad-handwriting.js";

type MetricCardProps = {
  value: string;
  valueClass: string;
  accentGradient: string;
  hoverClass: string;
  title: string;
  subtitle: string;
  footerLabel: string;
  icon: ReactNode;
};

function MetricCard({
  value,
  valueClass,
  accentGradient,
  hoverClass,
  title,
  subtitle,
  footerLabel,
  icon,
}: MetricCardProps) {
  return (
    <div className="group relative flex min-h-[12rem] flex-col justify-between overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-[inset_0_1px_10px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-sm sm:h-56 sm:p-8">
      <div
        className={`absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r ${accentGradient}`}
        aria-hidden
      />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div
            className={`mb-3 text-5xl font-light leading-none tracking-tighter sm:mb-4 sm:text-6xl lg:text-7xl ${valueClass}`}
          >
            {value}
          </div>
          <h3 className="text-lg font-light leading-tight text-white">{title}</h3>
          <p className="mt-1 text-sm font-light text-zinc-400">{subtitle}</p>
        </div>
        <div
          className={`mt-5 flex items-center gap-1.5 text-sm font-light text-zinc-500 transition-colors ${hoverClass}`}
        >
          {icon}
          {footerLabel}
        </div>
      </div>
    </div>
  );
}

export default function DeveloperTestimonial() {
  return (
    <section
      id="testimonials"
      className="bg-[#030303] font-[Inter,sans-serif] text-zinc-400 antialiased"
      aria-labelledby="developer-testimonial-quote"
    >
      <div className="container-page py-16 sm:py-20 md:py-24">
        <div className="mb-12 flex flex-col items-start justify-between gap-10 sm:mb-16 sm:gap-12 lg:flex-row lg:gap-16">
          <blockquote className="m-0 min-w-0 max-w-3xl">
            <h2
              id="developer-testimonial-quote"
              className="text-2xl font-light leading-[1.35] tracking-tight text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)] sm:text-3xl md:text-4xl"
            >
              &ldquo;I built Null Threat because I wanted a scanner I could read end to end — four
              local engines, expandable Deep Analysis with Identity, Structure, Metadata, and Steg
              checks, and nothing leaving the machine. Video-safe rules fixed false positives on our
              MP4 test files. If you care about offline verification, this is the workflow I wished
              existed before I wrote it.&rdquo;
            </h2>
          </blockquote>

          <div className="flex w-full shrink-0 flex-col items-start text-left lg:w-auto lg:items-end lg:text-right">
            <div className="w-full min-w-0 max-w-sm lg:ml-auto [&_div]:!text-left lg:[&_div]:!text-right">
              <BadHandwriting
                text="Developer of Null Threat"
                fontSize={28}
                color="#FAFAFA"
                letterSpacing={0.5}
                lineHeight={1.15}
                fontWeight={500}
                seed={42}
                alignment="left"
              />
            </div>
            <div className="text-xs uppercase tracking-widest text-zinc-500">
              Core contributor
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.18em] text-zinc-600">
              By a Null Threat developer
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <MetricCard
            value="500K+"
            valueClass="text-emerald-400 drop-shadow-[0_0_12px_rgba(52,211,153,0.6)]"
            accentGradient="from-transparent via-emerald-500/50 to-transparent"
            hoverClass="group-hover:text-emerald-400"
            title="Local signatures indexed"
            subtitle="MalwareBazaar + NSRL hash coverage"
            footerLabel="Hash lookup"
            icon={<ChatBubbleLeftRightIcon className="h-[18px] w-[18px] stroke-[1.5]" aria-hidden />}
          />
          <MetricCard
            value="4×"
            valueClass="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
            accentGradient="from-transparent via-amber-500/50 to-transparent"
            hoverClass="group-hover:text-amber-400"
            title="Engines in one offline scan"
            subtitle="Hash, signatures, YARA, deep analysis"
            footerLabel="Detection pipeline"
            icon={<RocketLaunchIcon className="h-[18px] w-[18px] stroke-[1.5]" aria-hidden />}
          />
          <MetricCard
            value="100%"
            valueClass="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
            accentGradient="from-transparent via-cyan-500/50 to-transparent"
            hoverClass="group-hover:text-cyan-400"
            title="On-device verification"
            subtitle="Zero cloud uploads, zero telemetry"
            footerLabel="Offline scanning"
            icon={<CircleStackIcon className="h-[18px] w-[18px] stroke-[1.5]" aria-hidden />}
          />
        </div>
      </div>
    </section>
  );
}
