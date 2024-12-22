"use client";

import { useState, useEffect } from "react";

export type FontOption = "mono" | "kumbh" | "roboto" | null;
export type ColorOption = "red" | "blue" | "purple" | null;

export const useFont = () => {
	const [activeFont, setActiveFont] = useState<FontOption>(null);
	const [activeColor, setActiveColor] = useState<ColorOption>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedFont = localStorage.getItem("font") as FontOption;
			const storedColor = localStorage.getItem("color") as ColorOption;
			setActiveFont(storedFont);
			setActiveColor(storedColor);
			setMounted(true);
		}
	}, [activeFont, activeColor]); // Only run once on mount

	const handleFontChange = (newFont: FontOption) => {
		setActiveFont(newFont); // Update state first
		localStorage.setItem("font", newFont); // Then persist to localStorage
	};

	const handleColorChange = (newColor: ColorOption) => {
		setActiveColor(newColor); // Update state first
		localStorage.setItem("color", newColor); // Then persist to localStorage
	};

	return {
		activeFont,
		activeColor,
		handleFontChange,
		handleColorChange,
		mounted,
	};
};
