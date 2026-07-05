import HeroContent from "./HeroContent";

export default function Hero({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-transparent pb-12 pt-20 sm:pb-16 sm:pt-24 md:pb-20"
    >
      <HeroContent reducedMotion={reducedMotion} />
    </section>
  );
}
