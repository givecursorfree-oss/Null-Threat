import { axe, toHaveNoViolations } from "jest-axe";
import { render, screen } from "@testing-library/react";
import App from "@/App";

expect.extend(toHaveNoViolations);

vi.mock("@/components/Preloader", () => ({
  default: () => null,
}));

vi.mock("@/components/RedOverlayUnicornStudioBackground", () => ({
  default: () => null,
}));

vi.mock("@/components/Hero", () => ({
  default: () => <section id="hero">Hero</section>,
}));

vi.mock("@/components/TrustBar", () => ({
  default: () => <section>Trust</section>,
}));

vi.mock("@/components/Animated3ColumnValueProposition", () => ({
  default: () => <section id="platform">Platform</section>,
}));

vi.mock("@/components/ProblemSolution", () => ({
  default: () => <section>ProblemSolution</section>,
}));

vi.mock("@/components/EngineStepper", () => ({
  default: () => <section id="engines">Engines</section>,
}));

vi.mock("@/components/FeaturesGrid", () => ({
  default: () => <section id="features">Features</section>,
}));

vi.mock("@/components/RiskScore", () => ({
  default: () => <section>Risk</section>,
}));

vi.mock("@/components/OpenSource", () => ({
  default: () => <section id="opensource">Open source</section>,
}));

vi.mock("@/components/DownloadCTA", () => ({
  default: () => <section id="download">Download</section>,
}));

vi.mock("@/components/SeoFaq", () => ({
  default: () => <section id="faq">FAQ</section>,
}));

vi.mock("@/components/Footer", () => ({
  default: () => <footer>Footer</footer>,
}));

describe("Landing accessibility", () => {
  it("has a skip link and main landmark", () => {
    render(<App />);

    const skipLink = screen.getByRole("link", { name: /skip to main content/i });
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("has no obvious axe violations", async () => {
    const { container } = render(<App />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
