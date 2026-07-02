import { useState } from "react";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
import { SectionReveal } from "./SectionReveal";

const BRAND_VIDEO_SRC = "/brand-video.mp4";
const BRAND_VIDEO_POSTER = "/images/cta-download-bg.jpg";

export default function BrandVideoSection() {
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  return (
    <section id="brand-video" className="bg-obsidian pb-8 pt-4 md:pb-10">
      <div className="container-page">
        <SectionReveal>
          <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-card border border-white/10 bg-ink/80 p-5 md:p-7">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-caption font-medium uppercase tracking-[0.14em] text-ash">
                  Brand Story
                </p>
                <h2 className="mt-2 text-heading-sm font-semibold tracking-tight text-snow md:text-heading">
                  See how Null Threat protects offline systems
                </h2>
                <p className="mt-2 max-w-2xl text-body text-ash">
                  A short brand film that explains the mission, design language, and product trust
                  model in one professional walkthrough.
                </p>
              </div>
            </div>

            {videoUnavailable ? (
              <div className="flex aspect-video w-full items-center justify-center rounded-card-compact border border-dashed border-white/20 bg-obsidian/70 p-6 text-center">
                <div>
                  <PlayCircleIcon className="mx-auto h-10 w-10 text-ash" aria-hidden />
                  <p className="mt-3 text-body-lg font-medium text-snow">Brand video placeholder</p>
                  <p className="mt-1 text-body text-ash">
                    Add your video file at <code className="text-snow">public/brand-video.mp4</code>{" "}
                    to enable playback.
                  </p>
                </div>
              </div>
            ) : (
              <video
                className="aspect-video w-full rounded-card-compact border border-white/10 bg-black object-cover"
                controls
                preload="metadata"
                poster={BRAND_VIDEO_POSTER}
                onError={() => setVideoUnavailable(true)}
              >
                <source src={BRAND_VIDEO_SRC} type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
