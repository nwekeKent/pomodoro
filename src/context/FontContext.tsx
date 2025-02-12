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
export type ModeOption = "pomodoro" | "short break" | "long break";

interface TimeSettings {
	pomodoro: number;
	"short break": number;
	"long break": number;
}

interface AppContextType {
	activeFont: FontOption;
	activeColor: ColorOption;
	activeMode: ModeOption;
	times: TimeSettings;
	handleFontChange: (font: FontOption) => void;
	handleColorChange: (color: ColorOption) => void;
	handleModeChange: (mode: ModeOption) => void;
	handleTimeChange: (mode: ModeOption, minutes: number) => void;
	mounted: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_TIMES: TimeSettings = {
	pomodoro: 25,
	"short break": 5,
	"long break": 15,
};

export function FontProvider({ children }: { children: ReactNode }) {
	const [activeFont, setActiveFont] = useState<FontOption>("mono");
	const [activeColor, setActiveColor] = useState<ColorOption>("red");
	const [activeMode, setActiveMode] = useState<ModeOption>("pomodoro");
	const [times, setTimes] = useState<TimeSettings>(DEFAULT_TIMES);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedFont = (localStorage.getItem("font") || "mono") as FontOption;
			const storedColor = (localStorage.getItem("color") ||
				"red") as ColorOption;
			const storedMode = (localStorage.getItem("mode") ||
				"pomodoro") as ModeOption;
			const storedTimes = JSON.parse(
				localStorage.getItem("times") || JSON.stringify(DEFAULT_TIMES)
			) as TimeSettings;

			setActiveFont(storedFont);
			setActiveColor(storedColor);
			setActiveMode(storedMode);
			setTimes(storedTimes);
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

	const handleModeChange = (mode: ModeOption) => {
		console.log("Mode changing to:", mode);
		setActiveMode(mode);
		localStorage.setItem("mode", mode);
	};

	const handleTimeChange = (mode: ModeOption, minutes: number) => {
		const newTimes = { ...times, [mode]: minutes };
		setTimes(newTimes);
		localStorage.setItem("times", JSON.stringify(newTimes));
	};

	return (
		<AppContext.Provider
			value={{
				activeFont,
				activeColor,
				activeMode,
				times,
				handleFontChange,
				handleColorChange,
				handleModeChange,
				handleTimeChange,
				mounted,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}

export function useFont() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useFont must be used within a FontProvider");
	}
	return context;
}
