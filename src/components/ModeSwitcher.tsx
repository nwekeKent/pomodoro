"use client";

import React from "react";
import { useFont } from "@/hooks/useFont";

interface ModeSwitcherProps {
	activeMode: string;
	setActiveMode: (mode: string) => void;
}

export function ModeSwitcher({ activeMode, setActiveMode }: ModeSwitcherProps) {
	const { activeColor, mounted } = useFont();
	console.log("activeColor", activeColor);

	const mode = ["pomodoro", "short break", "long break"];
	console.log("activeMode", activeMode);

	if (!mounted) {
		return null;
	}

	return (
		<div className="w-full mt-[45px] md:mt-[58px] max-w-[373px] h-16 flex justify-between  rounded-[32px] bg-secondary-navy-200 p-2">
			{mode.map((item, index) => {
				return (
					<div
						key={index}
						className={`h-full  px-4 flex justify-center text-center items-center font-bold text-xs md:text-sm  rounded-[27px]  ${
							activeMode === item
								? `opacity-100  text-secondary-navy-100 bg-primary-${activeColor}`
								: "text-secondary-grey opacity-40"
						}`}
						onClick={() => setActiveMode(item)}
					>
						{item}
					</div>
				);
			})}
		</div>
	);
}
