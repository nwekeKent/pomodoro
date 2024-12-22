"use client";

import { Clock } from "@/components/Clock";
import { ModeSwitcher } from "@/components/ModeSwitcher";
import { useFont } from "@/hooks/useFont";
import { useState } from "react";
import Image from "next/image";
import { SettingsModal } from "@/components/settings/SettingsModal";

export default function Home() {
	const { activeFont, mounted } = useFont();
	const [activeMode, setActiveMode] = useState("pomodoro");
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

	const closeSettingsModal = () => {
		setIsSettingsModalOpen(false);
	};

	const openSettingsModal = () => {
		setIsSettingsModalOpen(true);
	};

	if (!mounted) {
		return null;
	}

	return (
		<div
			style={{ fontFamily: `var(--font-${activeFont})` }}
			className={`w-full h-full py-8 md:py-12 flex flex-col items-center px-6`}
		>
			<h3 className="text-secondary-grey text-2xl md:text-[32px] leading-normal font-kumbh font-bold text-center">
				pomodoro
			</h3>
			<ModeSwitcher activeMode={activeMode} setActiveMode={setActiveMode} />
			<Clock />
			<Image
				src="/assets/icons/icon-settings.svg"
				alt="logo"
				width={28}
				height={28}
				onClick={openSettingsModal}
			/>
			{isSettingsModalOpen && (
				<SettingsModal closeSettingsModal={closeSettingsModal} />
			)}
		</div>
	);
}
