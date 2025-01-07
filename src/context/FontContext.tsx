"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

export type FontOption = "mono" | "kumbh" | "roboto" | null;
export type ColorOption = "red" | "blue" | "purple" | null;

interface FontContextType {
	activeFont: FontOption;
	activeColor: ColorOption;
	handleFontChange: (font: FontOption) => void;
	handleColorChange: (color: ColorOption) => void;
	mounted: boolean;
}

const FontContext = createContext<FontContextType | undefined>(undefined);

export function FontProvider({ children }: { children: ReactNode }) {
	const [activeFont, setActiveFont] = useState<FontOption>("mono");
	const [activeColor, setActiveColor] = useState<ColorOption>("red");
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedFont = (localStorage.getItem("font") || "mono") as FontOption;
			const storedColor = (localStorage.getItem("color") ||
				"red") as ColorOption;
			setActiveFont(storedFont);
			setActiveColor(storedColor);
			setMounted(true);
		}
	}, []);

	const handleFontChange = (newFont: FontOption) => {
		if (newFont) {
			setActiveFont(newFont);
			localStorage.setItem("font", newFont);
		}
	};

	const handleColorChange = (newColor: ColorOption) => {
		if (newColor) {
			setActiveColor(newColor);
			localStorage.setItem("color", newColor);
		}
	};

	return (
		<FontContext.Provider
			value={{
				activeFont,
				activeColor,
				handleFontChange,
				handleColorChange,
				mounted,
			}}
		>
			{children}
		</FontContext.Provider>
	);
}

export function useFont() {
	const context = useContext(FontContext);
	if (context === undefined) {
		throw new Error("useFont must be used within a FontProvider");
	}
	return context;
}
