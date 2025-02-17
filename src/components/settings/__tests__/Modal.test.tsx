import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../Modal";
import { AppProvider } from "@/context/AppContext";

describe("Modal", () => {
	const mockCloseModal = jest.fn();

	beforeEach(() => {
		// Mock window.location.reload
		const mockReload = jest.fn();
		Object.defineProperty(window, "location", {
			value: { reload: mockReload },
		});
	});

	const renderModal = () => {
		return render(
			<AppProvider>
				<Modal closeSettingsModal={mockCloseModal} />
			</AppProvider>
		);
	};

	it("renders settings sections", () => {
		renderModal();

		expect(screen.getByText(/time \(minutes\)/i)).toBeInTheDocument();
		expect(screen.getByText(/font/i)).toBeInTheDocument();
		expect(screen.getByText(/color/i)).toBeInTheDocument();
	});

	it("updates time settings when changing input values", () => {
		renderModal();

		const pomodoroInput = screen.getAllByRole("textbox")[0];
		fireEvent.change(pomodoroInput, { target: { value: "30" } });

		expect(pomodoroInput).toHaveValue("30");
	});

	it("closes modal when clicking close button", () => {
		renderModal();

		const closeButton = screen.getByRole("button", { name: /close settings/i });
		fireEvent.click(closeButton);

		expect(mockCloseModal).toHaveBeenCalled();
	});

	it("applies changes when clicking apply button", () => {
		renderModal();

		const applyButton = screen.getByRole("button", { name: /apply/i });
		fireEvent.click(applyButton);

		expect(mockCloseModal).toHaveBeenCalled();
	});
});
