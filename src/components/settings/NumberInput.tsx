"use client";

import Image from "next/image";

interface NumberInputProps {
	value: number;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
}

export function NumberInput({ value, onChange, min, max }: NumberInputProps) {
	const handleIncrement = () => {
		if (max !== undefined && value >= max) return;
		onChange(value + 1);
	};

	const handleDecrement = () => {
		if (min !== undefined && value <= min) return;
		onChange(value - 1);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = parseInt(e.target.value);
		if (isNaN(newValue)) return;
		if (min !== undefined && newValue < min) return;
		if (max !== undefined && newValue > max) return;
		onChange(newValue);
	};

	return (
		<div className="relative w-full max-w-[140px]">
			<input
				type="text"
				inputMode="numeric"
				pattern="[0-9]*"
				value={value}
				onChange={handleInputChange}
				className="w-full h-10 bg-secondary-light-grey rounded-lg pl-4 pr-12 text-secondary-navy-200 font-bold focus:outline-none"
				readOnly
			/>
			<div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1">
				<button
					onClick={handleIncrement}
					className="text-secondary-navy-200/50 hover:text-primary-blue transition-colors"
					aria-label="Increment"
				>
					<Image
						src="/assets/icons/icon-arrow-up.svg"
						width={14}
						height={7}
						alt="up"
					/>
				</button>
				<button
					onClick={handleDecrement}
					className="text-secondary-navy-200/50 hover:text-primary-blue transition-colors"
					aria-label="Decrement"
				>
					<Image
						src="/assets/icons/icon-arrow-down.svg"
						width={14}
						height={7}
						alt="down"
					/>
				</button>
			</div>
		</div>
	);
}
