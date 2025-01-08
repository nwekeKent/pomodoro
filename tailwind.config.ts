import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		//Colors
		"bg-primary-red",
		"bg-primary-blue",
		"bg-primary-purple",

		// Fonts
		"font-kumbh",
		"font-mono",
		"font-roboto",
	],
	theme: {
		extend: {
			colors: {
				primary: {
					red: "#F87070",
					blue: "#70F3F8",
					purple: "#D881F8",
				},

				secondary: {
					grey: "#D7E0FF",
					"light-grey": "#EFF1FA",
					"navy-100": "#1E213F",
					"navy-200": "#161932",
				},
			},
			fontFamily: {
				kumbh: ["var(--font-kumbh)"],
				roboto: ["var(--font-roboto)"],
				mono: ["var(--font-mono)"],
			},
			backgroundImage: {
				"custom-gradient": "linear-gradient(315deg, #2E325A 0%, #0E112A 100%)",
			},
			boxShadow: {
				"custom-shadow":
					"-50px -50px 100px 0px #272C5A, 50px 50px 100px 0px #121530",
			},
		},
	},
	plugins: [],
} satisfies Config;
