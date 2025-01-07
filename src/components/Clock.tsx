"use client";

import { useFont } from "@/context/FontContext";
import React, { useState, useEffect } from "react";

export const Clock = () => {
	const { activeColor, activeMode, times, handleModeChange } = useFont();
	const [timeLeft, setTimeLeft] = useState(times[activeMode] * 60);
	const [isRunning, setIsRunning] = useState(false);
	const [pomodoroCount, setPomodoroCount] = useState(0);

	// Reset timer when mode changes
	useEffect(() => {
		setTimeLeft(times[activeMode] * 60);
		setIsRunning(false);
	}, [activeMode, times]);

	const minutes = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;
	const totalSeconds = times[activeMode] * 60;
	const progress = (timeLeft / totalSeconds) * 100;

	useEffect(() => {
		let interval: NodeJS.Timeout;
		if (isRunning && timeLeft > 0) {
			interval = setInterval(() => {
				setTimeLeft(prev => prev - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			// Timer completed
			if (activeMode === "pomodoro") {
				// Increment pomodoro count
				const newCount = pomodoroCount + 1;
				setPomodoroCount(newCount);

				// On 4th pomodoro, switch to long break
				if (newCount % 4 === 0) {
					handleModeChange("long break");
				} else {
					handleModeChange("short break");
				}
			} else if (activeMode === "long break") {
				// Reset count after long break
				setPomodoroCount(0);
				handleModeChange("pomodoro");
			} else if (activeMode === "short break") {
				handleModeChange("pomodoro");
			}
			setIsRunning(false);
		}
		return () => clearInterval(interval);
	}, [isRunning, timeLeft, activeMode, pomodoroCount, handleModeChange]);

	const toggleTimer = () => {
		setIsRunning(!isRunning);
	};

	return (
		<div className="md:mt-12 mt-[109px] w-[300px] h-[300px] md:w-[410px] md:h-[410px] bg-custom-gradient  rounded-[410px] mb-[50px] p-4 shadow-custom-shadow flex justify-center items-center relative">
			<div className="w-full h-full bg-secondary-navy-200 rounded-[100%] flex flex-col justify-center items-center relative">
				{/* Progress Ring */}
				<div
					className="absolute inset-0 rounded-full"
					style={{
						background: `conic-gradient(var(--primary-${
							activeColor || "red"
						}) ${progress}%, transparent ${progress}%)`,
						padding: "13px",
						maskImage: "radial-gradient(transparent 65%, black 66%)",
						WebkitMaskImage: "radial-gradient(transparent 65%, black 66%)",
					}}
				/>

				{/* Timer Display */}
				<div className="relative z-10 flex flex-col items-center">
					<div className="text-[80px] md:text-[100px]  leading-normal text-secondary-grey font-bold">
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
