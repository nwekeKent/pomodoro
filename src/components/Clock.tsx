"use client";

import { useAppContext } from "@/context/AppContext";
import React, { useState, useEffect } from "react";

export const Clock = () => {
	const { activeColor, activeMode, times, handleModeChange } = useAppContext();
	const [timeLeft, setTimeLeft] = useState(times[activeMode] * 60);
	const [isRunning, setIsRunning] = useState(false);
	const [pomodoroCount, setPomodoroCount] = useState(0);
	const [shouldSwitchMode, setShouldSwitchMode] = useState(false);

	// Reset timer when mode or times change
	useEffect(() => {
		setTimeLeft(times[activeMode] * 60);
		setIsRunning(false);
	}, [activeMode, times]);

	// Timer effect
	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isRunning && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft(prev => prev - 1);
			}, 1000);
		} else if (timeLeft === 0 && isRunning) {
			setIsRunning(false);

			// Switch modes
			if (activeMode === "pomodoro") {
				setPomodoroCount(prev => prev + 1);
				const nextMode = pomodoroCount % 4 === 3 ? "long break" : "short break";
				handleModeChange(nextMode);
			} else {
				handleModeChange("pomodoro");
			}
		}

		return () => clearInterval(interval);
	}, [isRunning, timeLeft, activeMode, pomodoroCount, handleModeChange]);

	// Handle mode switching in a separate effect
	useEffect(() => {
		if (shouldSwitchMode) {
			if (activeMode === "pomodoro") {
				if (pomodoroCount % 4 === 0) {
					handleModeChange("long break");
				} else {
					handleModeChange("short break");
				}
			} else if (activeMode === "long break" || activeMode === "short break") {
				handleModeChange("pomodoro");
			}
			setShouldSwitchMode(false);
		}
	}, [shouldSwitchMode, activeMode, pomodoroCount, handleModeChange]);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;
	const totalSeconds = times[activeMode] * 60;
	const progress = (timeLeft / totalSeconds) * 100;

	const toggleTimer = () => {
		setIsRunning(!isRunning);
	};

	return (
		<div className="md:mt-12 mt-[109px] w-[300px] h-[300px] md:w-[410px] md:h-[410px] bg-custom-gradient  rounded-[410px] mb-[50px] p-[22px] shadow-custom-shadow flex justify-center items-center relative">
			<div className="w-full h-full bg-secondary-navy-200  rounded-[100%] flex flex-col justify-center items-center relative">
				{/* Progress Ring */}
				<div
					data-testid="progress-ring"
					className="absolute left-3 top-3 right-3 bottom-3 inset-0 rounded-full"
					style={{
						background: `conic-gradient(var(--primary-${
							activeColor || "red"
						}) ${progress}%, transparent ${progress}%)`,
						padding: "10px",
						maskImage: "radial-gradient(transparent 65%, black 66%)",
						WebkitMaskImage: "radial-gradient(transparent 65%, black 66%)",
					}}
				/>

				{/* Timer Display */}

				<div className="relative z-10 flex flex-col items-center">
					<div className="text-[60px] md:text-[90px]  leading-normal text-secondary-grey font-bold">
						{`${minutes.toString().padStart(2, "0")}:${seconds
							.toString()
							.padStart(2, "0")}`}
					</div>
					<button
						onClick={toggleTimer}
						className={`text-secondary-grey text-center text-[14px] md:text-[16px] tracking-[13.13px] md:tracking-[15px] uppercase font-bold hover:text-primary-${
							activeColor || "red"
						} transition-colors`}
					>
						{isRunning ? "PAUSE" : "START"}
					</button>
				</div>
			</div>
		</div>
	);
};
