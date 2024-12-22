import React from "react";
import { Modal } from "./Modal";

interface SettingsModalProps {
	closeSettingsModal: () => void;
}

export const SettingsModal = ({ closeSettingsModal }: SettingsModalProps) => {
	return (
		<div className="absolute flex justify-center px-6 py-10 items-center  min-h-screen w-full h-full top-0 left-0 bg-black/50 ">
			<Modal closeSettingsModal={closeSettingsModal} />
		</div>
	);
};
