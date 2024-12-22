import { Kumbh_Sans, Roboto_Slab, Space_Mono } from "next/font/google";

export const roboto = Roboto_Slab({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-roboto",
});

export const mono = Space_Mono({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-mono",
});

export const kumbh = Kumbh_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-kumbh",
});
