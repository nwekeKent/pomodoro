"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useFont } from "@/hooks/useFont";
import { NumberInput } from "./NumberInput";
import type { FontOption, ColorOption } from "@/hooks/useFont";

interface TimeOption {
	title: string;
	defaultTime: number;
}

export const Modal = ({
	closeSettingsModal,
}: {
	closeSettingsModal: () => void;
}) => {
	const { activeFont, activeColor, handleFontChange, handleColorChange } =
		useFont();
	const [times, setTimes] = useState<TimeOption[]>([
		{ title: "pomodoro", defaultTime: 25 },
		{ title: "short break", defaultTime: 5 },
		{ title: "long break", defaultTime: 15 },
	]);

	const handleTimeChange = (index: number, newValue: number) => {
		setTimes(prevTimes => {
			const newTimes = [...prevTimes];
			newTimes[index] = { ...newTimes[index], defaultTime: newValue };
			return newTimes;
		});
	};

	const fonts: FontOption[] = ["kumbh", "roboto", "mono"];
	const colors: ColorOption[] = ["red", "blue", "purple"];

	console.log("close", closeSettingsModal);

	return (
		<div className="relative z-10 w-full h-auto min-h-[464px] bg-white rounded-3xl max-w-[540px] pb-8">
			<header className="flex justify-between items-center md:px-10 md:py-[34px] px-6 py-6 border-b border-b-[#E3E1E1]">
				<h1 className="text-secondary-navy-200 text-[24px] leading-normal font-bold">
					Settings
				</h1>
				<Image
					src="/assets/icons/icon-close.svg"
					width={14}
					height={14}
					alt="icon-close"
					onClick={closeSettingsModal}
				/>
			</header>

			<div className="md:px-10 px-6">
				<section className=" py-6 border-b border-b-[#E3E1E1]">
					<h3 className="text-secondary-navy-200 text-sm uppercase font-bold tracking-[5px] mb-6">
						Time (minutes)
					</h3>

					<div className="grid md:grid-cols-3 gap-4">
						{times.map((time, index) => (
							<div
								key={index}
								className="flex md:flex-col gap-2 flex-row justify-between items-center md:justify-start md:items-start"
							>
								<label className="text-secondary-navy-100/40 text-xs">
									{time.title}
								</label>
								<NumberInput
									value={time.defaultTime}
									onChange={value => handleTimeChange(index, value)}
									min={1}
									max={60}
								/>
							</div>
						))}
					</div>
				</section>

				<section className=" md:py-8  py-6 border-b border-b-[#E3E1E1] flex md:flex-row flex-col gap-4 md:justify-between justify-center items-center">
					<h3 className="text-secondary-navy-200 text-sm uppercase font-bold tracking-[5px]">
						Font
					</h3>

					<div className="flex gap-4">
						{fonts.map(font => (
							<button
								key={font}
								style={{ fontFamily: `var(--font-${font})` }}
								className={`w-10 h-10 rounded-[50%] flex justify-center items-center text-sm font-bold ${
									activeFont === font
										? "bg-secondary-navy-200 text-white"
										: "bg-secondary-light-grey text-secondary-navy-100"
								}`}
								onClick={() => handleFontChange(font)}
							>
								Aa
							</button>
						))}
					</div>
				</section>

				<section className=" md:py-8  py-6  flex md:flex-row flex-col gap-4 md:justify-between justify-center items-center">
					<h3 className="text-secondary-navy-200 text-sm uppercase font-bold tracking-[5px]">
						Color
					</h3>

					<div className="flex gap-4">
						{colors.map((color, index) => {
							return (
								<div
									key={index}
									className={`w-10 h-10 rounded-[50%] flex justify-center items-center bg-primary-${color}
								
									}`}
									onClick={() => handleColorChange(color as ColorOption)}
								>
									{" "}
									{activeColor === color && (
										<Image
											src="/assets/icons/icon-tick.png"
											width={15}
											height={15}
											alt="icon-close"
										/>
									)}
								</div>
							);
						})}
					</div>
				</section>
			</div>

			<div className="absolute -bottom-[26.5px] left-0 right-0 flex justify-center">
				<button
					className="w-[140px] h-[53px] bg-primary-red hover:bg-primary-red/80 
						text-white rounded-[26.5px] font-bold transition-colors"
				>
					Apply
				</button>
			</div>
		</div>
	);
};
