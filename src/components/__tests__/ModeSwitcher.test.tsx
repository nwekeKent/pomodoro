import { render, screen, fireEvent } from "@testing-library/react";
import { ModeSwitcher } from "../ModeSwitcher";
import { AppProvider } from "@/context/AppContext";

describe("ModeSwitcher", () => {
	const renderModeSwitcher = () => {
		return render(
			<AppProvider>
				<ModeSwitcher />
			</AppProvider>
		);
	};

	it("renders all mode buttons", () => {
		renderModeSwitcher();

		expect(
			screen.getByRole("button", { name: /pomodoro/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /short break/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /long break/i })
		).toBeInTheDocument();
	});

	it("highlights active mode button", () => {
		renderModeSwitcher();

		const pomodoroButton = screen.getByRole("button", { name: /pomodoro/i });
		expect(pomodoroButton).toHaveClass("opacity-100");

		const shortBreakButton = screen.getByRole("button", {
			name: /short break/i,
		});
		expect(shortBreakButton).toHaveClass("opacity-40");
	});

	it("switches mode when clicking a different mode button", () => {
		renderModeSwitcher();

		const shortBreakButton = screen.getByRole("button", {
			name: /short break/i,
		});
		fireEvent.click(shortBreakButton);

		expect(shortBreakButton).toHaveClass("opacity-100");
		expect(screen.getByRole("button", { name: /pomodoro/i })).toHaveClass(
			"opacity-40"
		);
	});
});
