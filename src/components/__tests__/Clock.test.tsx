import "@testing-library/jest-dom";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Clock } from "../Clock";
import { AppProvider } from "@/context/AppContext";

describe("Clock", () => {
	beforeEach(() => {
		jest.useFakeTimers();
		// Mock localStorage
		Storage.prototype.getItem = jest.fn(key => {
			const defaults: Record<string, string> = {
				font: "mono",
				color: "red",
				mode: "pomodoro",
				times: JSON.stringify({
					pomodoro: 25,
					"short break": 5,
					"long break": 15,
				}),
			};
			return defaults[key] || null;
		});
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.clearAllMocks();
	});

	const renderClock = () => {
		return render(
			<AppProvider>
				<Clock />
			</AppProvider>
		);
	};

	it("renders initial time correctly", () => {
		renderClock();
		expect(screen.getByText("25:00")).toBeInTheDocument();
	});

	it("starts countdown when clicking start button", () => {
		renderClock();
		const startButton = screen.getByRole("button", { name: /start/i });

		fireEvent.click(startButton);
		expect(startButton).toHaveTextContent("PAUSE");

		act(() => {
			jest.advanceTimersByTime(1000);
		});

		expect(screen.getByText("24:59")).toBeInTheDocument();
	});

	it("pauses countdown when clicking pause button", () => {
		renderClock();
		const startButton = screen.getByRole("button", { name: /start/i });

		fireEvent.click(startButton);
		act(() => {
			jest.advanceTimersByTime(1000);
		});

		const pauseButton = screen.getByRole("button", { name: /pause/i });
		fireEvent.click(pauseButton);
		expect(pauseButton).toHaveTextContent("START");

		act(() => {
			jest.advanceTimersByTime(1000);
		});

		expect(screen.getByText("24:59")).toBeInTheDocument();
	});

	it("switches to break after pomodoro completes", async () => {
		renderClock();
		const startButton = screen.getByRole("button", { name: /start/i });

		fireEvent.click(startButton);

		// Advance almost 25 minutes
		act(() => {
			jest.advanceTimersByTime(24 * 60 * 1000 + 59 * 1000);
		});
		expect(screen.getByText("00:01")).toBeInTheDocument();

		// Advance the final second
		act(() => {
			jest.advanceTimersByTime(1000);
		});

		// Should now be in short break mode with 5:00 on the timer
		expect(screen.getByText("05:00")).toBeInTheDocument();
	});

	it("shows progress ring based on time remaining", () => {
		renderClock();
		const startButton = screen.getByRole("button", { name: /start/i });

		fireEvent.click(startButton);

		// After 12.5 minutes (50% complete)
		act(() => {
			jest.advanceTimersByTime(12.5 * 60 * 1000);
		});

		const progressRing = screen.getByTestId("progress-ring");
		expect(progressRing).toHaveStyle({
			background: expect.stringContaining("50%"),
		});
	});
});
