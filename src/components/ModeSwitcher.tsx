"use client";

import React from "react";
import { useFont, type ModeOption } from "@/context/FontContext";

export function ModeSwitcher() {
	const { activeColor, activeMode, handleModeChange, mounted } = useFont();
	const modes: ModeOption[] = ["pomodoro", "short break", "long break"];

	if (!mounted) return null;

	return (
		<div className="w-full mt-[45px] md:mt-[58px] max-w-[373px] h-16 flex justify-between rounded-[32px] bg-secondary-navy-200 p-2">
			{modes.map(mode => (
				<div
					key={mode}
					className={`h-full px-4 flex justify-center text-center items-center font-bold text-xs md:text-sm rounded-[27px] cursor-pointer ${
						activeMode === mode
							? `opacity-100 text-secondary-navy-100 bg-primary-${activeColor}`
							: "text-secondary-grey opacity-40"
					}`}
					onClick={() => handleModeChange(mode)}
				>
					{mode}
				</div>
			))}
		</div>
	);
}
