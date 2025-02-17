import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { NumberInput } from "../NumberInput";

describe("NumberInput", () => {
	const mockOnChange = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders with initial value", () => {
		render(<NumberInput value={25} onChange={mockOnChange} />);
		expect(screen.getByRole("textbox")).toHaveValue("25");
	});

	it("increments value when clicking up arrow", () => {
		render(<NumberInput value={25} onChange={mockOnChange} />);

		const incrementButton = screen.getByLabelText("Increment");
		fireEvent.click(incrementButton);

		expect(mockOnChange).toHaveBeenCalledWith(26);
	});

	it("decrements value when clicking down arrow", () => {
		render(<NumberInput value={25} onChange={mockOnChange} />);

		const decrementButton = screen.getByLabelText("Decrement");
		fireEvent.click(decrementButton);

		expect(mockOnChange).toHaveBeenCalledWith(24);
	});

	it("respects min value constraint", () => {
		render(<NumberInput value={1} onChange={mockOnChange} min={1} />);

		const decrementButton = screen.getByLabelText("Decrement");
		fireEvent.click(decrementButton);

		expect(mockOnChange).not.toHaveBeenCalled();
	});

	it("respects max value constraint", () => {
		render(<NumberInput value={60} onChange={mockOnChange} max={60} />);

		const incrementButton = screen.getByLabelText("Increment");
		fireEvent.click(incrementButton);

		expect(mockOnChange).not.toHaveBeenCalled();
	});

	it("allows manual input of valid numbers", () => {
		render(<NumberInput value={25} onChange={mockOnChange} min={1} max={60} />);

		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "30" } });

		expect(mockOnChange).toHaveBeenCalledWith(30);
	});

	it("prevents invalid manual input", () => {
		render(<NumberInput value={25} onChange={mockOnChange} min={1} max={60} />);

		const input = screen.getByRole("textbox");
		fireEvent.change(input, { target: { value: "abc" } });

		expect(mockOnChange).not.toHaveBeenCalled();
	});
});
