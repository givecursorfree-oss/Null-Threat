import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "@/components/Nav";

describe("Navigation accessibility", () => {
  it("toggles mobile menu from keyboard", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    const toggle = screen.getByRole("button", { name: /open navigation menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    toggle.focus();
    await user.keyboard("{Enter}");

    expect(screen.getByRole("navigation", { name: /mobile/i })).toBeInTheDocument();
  });

  it("closes menu with Escape", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    const toggle = screen.getByRole("button", { name: /open navigation menu/i });
    await user.click(toggle);
    expect(screen.getByRole("navigation", { name: /mobile/i })).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("navigation", { name: /mobile/i })).not.toBeInTheDocument();
  });
});
