"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import React from "react";

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

export function AppProvider({ children }: { children: ReactNode }) {
	// Combine related state
	const [settings, setSettings] = useState({
		activeFont: "mono" as FontOption,
		activeColor: "red" as ColorOption,
		activeMode: "pomodoro" as ModeOption,
		times: DEFAULT_TIMES,
	});
	const [mounted, setMounted] = useState(false);

	// Batch localStorage operations
	const updateLocalStorage = React.useCallback(
		(updates: Partial<typeof settings>) => {
			Object.entries(updates).forEach(([key, value]) => {
				localStorage.setItem(
					key,
					key === "times" ? JSON.stringify(value) : (value as string)
				);
			});
		},
		[]
	);

	// Memoize handlers
	const handlers = React.useMemo(
		() => ({
			handleFontChange: (newFont: FontOption) => {
				if (newFont) {
					setSettings(prev => ({ ...prev, activeFont: newFont }));
					updateLocalStorage({ activeFont: newFont });
				}
			},
			handleColorChange: (newColor: ColorOption) => {
				if (newColor) {
					setSettings(prev => ({ ...prev, activeColor: newColor }));
					updateLocalStorage({ activeColor: newColor });
				}
			},
			handleModeChange: (mode: ModeOption) => {
				setSettings(prev => ({ ...prev, activeMode: mode }));
				updateLocalStorage({ activeMode: mode });
			},
			handleTimeChange: (mode: ModeOption, minutes: number) => {
				setSettings(prev => {
					const newTimes = { ...prev.times, [mode]: minutes };
					updateLocalStorage({ times: newTimes });
					return { ...prev, times: newTimes };
				});
			},
		}),
		[updateLocalStorage]
	);

	// Load initial state
	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedSettings = {
				activeFont: (localStorage.getItem("font") || "mono") as FontOption,
				activeColor: (localStorage.getItem("color") || "red") as ColorOption,
				activeMode: (localStorage.getItem("mode") || "pomodoro") as ModeOption,
				times: JSON.parse(
					localStorage.getItem("times") || JSON.stringify(DEFAULT_TIMES)
				) as TimeSettings,
			};
			setSettings(storedSettings);
			setMounted(true);
		}
	}, []);

	const value = React.useMemo(
		() => ({
			...settings,
			...handlers,
			mounted,
		}),
		[settings, handlers, mounted]
	);

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within a AppProvider");
	}
	return context;
}
