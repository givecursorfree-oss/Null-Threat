import CompareUILib from "@/components/shadcn-studio/blocks/compare-07/compare-07";
import { nullThreatComparisonData } from "@/data/compare-table";

export default function ProblemSolution() {
  return (
    <section
      id="compare"
      aria-labelledby="compare-heading"
      className="section-gap border-y border-white/8 bg-obsidian"
    >
      <CompareUILib data={nullThreatComparisonData} />
    </section>
  );
}
