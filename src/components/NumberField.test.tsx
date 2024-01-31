import { render, fireEvent } from "@testing-library/react";
import NumberField from "./NumberField";

describe("NumberField Component", () => {
  const handleChangeMock = jest.fn();

  beforeEach(() => {
    handleChangeMock.mockClear();
  });

  it("renders correctly", () => {
    const { getByTestId } = render(
      <NumberField
        id="test"
        value={10}
        handleChange={handleChangeMock}
        dataTestId="test-input"
        name="test"
        label="Test Label"
        error={false}
      />,
    );
    expect(getByTestId("test-input")).toBeInTheDocument();
  });

  it("matchs snapshot", () => {
    const { container } = render(
      <NumberField
        id="test"
        value={10}
        handleChange={handleChangeMock}
        dataTestId="test-input"
        name="test"
        label="Test Label"
        error={false}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("calls handleChange when input value changes", () => {
    const { getByTestId } = render(
      <NumberField
        id="test-id"
        label="Test Label"
        name="test-name"
        value={10}
        handleChange={handleChangeMock}
        dataTestId="test-data-testid"
        error={false}
      />,
    );

    fireEvent.change(getByTestId("test-data-testid"), {
      target: { value: "20" },
    });

    expect(handleChangeMock).toHaveBeenCalledTimes(1);
    expect(handleChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "20" }),
      }),
    );
  });

  it("applies correct styling to FormHelperText when error is true", () => {
    const { getByText } = render(
      <NumberField
        id="test"
        value={10}
        handleChange={handleChangeMock}
        dataTestId="test-input"
        name="test"
        label="Test Label"
        error={true} // Set error to true to display helper text
      />,
    );
    const formHelperText = getByText("This field must contain a valid number");
    expect(formHelperText).toHaveStyle("padding: 0");
    expect(formHelperText).toHaveStyle("margin: 0");
  });
});
