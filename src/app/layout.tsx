import type { Metadata } from "next";
import "./globals.css";
import { roboto, mono, kumbh } from "@/utils/fonts";
import { FontProvider } from "@/context/FontContext";

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${roboto.variable} ${kumbh.variable} ${mono.variable}`}
		>
			<body
				suppressHydrationWarning
				className="min-w-screen bg-secondary-navy-100"
			>
				<FontProvider>{children}</FontProvider>
			</body>
		</html>
	);
}
