import { render, screen } from "@testing-library/react";
import App from "./App";

describe("NumberField Component", () => {
  it("renders Delivery Fee Calculator title", () => {
    render(<App />);
    const titleElement = screen.getByText(/Delivery Fee Calculator/i);
    expect(titleElement).toBeInTheDocument();
  });
});
