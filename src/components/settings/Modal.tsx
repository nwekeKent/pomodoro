"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
	useFont,
	type FontOption,
	type ColorOption,
} from "@/context/FontContext";
import { NumberInput } from "./NumberInput";

export const Modal = ({
	closeSettingsModal,
}: {
	closeSettingsModal: () => void;
}) => {
	const {
		activeFont,
		activeColor,
		times,
		handleFontChange,
		handleColorChange,
		handleTimeChange,
	} = useFont();

	const [selectedFont, setSelectedFont] = useState<FontOption>(activeFont);
	const [selectedColor, setSelectedColor] = useState<ColorOption>(activeColor);

	const timeSettings = [
		{ title: "pomodoro" as const, defaultTime: times.pomodoro },
		{ title: "short break" as const, defaultTime: times["short break"] },
		{ title: "long break" as const, defaultTime: times["long break"] },
	];

	const applyChanges = () => {
		handleFontChange(selectedFont || "mono");
		handleColorChange(selectedColor || "red");
		closeSettingsModal();
		window.location.reload();
	};

	// Update the click handlers
	const handleFontSelect = (font: FontOption) => {
		setSelectedFont(font);
	};

	const handleColorSelect = (color: ColorOption) => {
		setSelectedColor(color);
	};

	const handleTimeUpdate = (index: number, newValue: number) => {
		const mode = timeSettings[index].title;
		handleTimeChange(mode, newValue);
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
						{timeSettings.map((time, index) => (
							<div
								key={index}
								className="flex md:flex-col gap-2 flex-row justify-between items-center md:justify-start md:items-start"
							>
								<label className="text-secondary-navy-100/40 text-xs">
									{time.title}
								</label>
								<NumberInput
									value={time.defaultTime}
									onChange={value => handleTimeUpdate(index, value)}
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
									selectedFont === font
										? "bg-secondary-navy-200 text-white"
										: "bg-secondary-light-grey text-secondary-navy-100"
								}`}
								onClick={() => handleFontSelect(font)}
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
									className={`w-10 h-10 rounded-[50%] flex justify-center items-center bg-primary-${color}`}
									onClick={() => handleColorSelect(color as ColorOption)}
								>
									{selectedColor === color && (
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
					onClick={applyChanges}
					className={`w-[140px] h-[53px] bg-primary-${
						activeColor || "red"
					} hover:bg-primary-${activeColor || "red"}/80 
						text-white rounded-[26.5px] font-bold transition-colors`}
				>
					Apply
				</button>
			</div>
		</div>
	);
};
