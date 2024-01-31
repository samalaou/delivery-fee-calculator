import { render } from "@testing-library/react";
import CalculatorResult from "./CalculatorResult";

describe("CalculatorResult component", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<CalculatorResult deliveryFee={10} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders delivery fee when deliveryFee is not null", () => {
    const { getByText } = render(<CalculatorResult deliveryFee={10} />);
    const deliveryFeeElement = getByText("10 euros");
    expect(deliveryFeeElement).toBeInTheDocument();
  });

  it("does not render delivery fee when deliveryFee is null", () => {
    const { queryByTestId } = render(<CalculatorResult deliveryFee={null} />);
    const deliveryFeeElement = queryByTestId("fee");
    expect(deliveryFeeElement).toBeNull();
  });
});
