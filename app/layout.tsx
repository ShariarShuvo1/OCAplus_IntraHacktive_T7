import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar/Navbar";
import { HeroHighlight } from "@/components/ui/hero-highlight";

const geistSans = localFont({
	src: "./fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});
const geistMono = localFont({
	src: "./fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

export const metadata: Metadata = {
	title: "OCAplus_IntraHacktive_T7",
	description: "OCAplus_IntraHacktive_T7",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider dynamic>
			<html lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable}  antialiased`}
				>
					<Navbar />
					<HeroHighlight className="h-screen-no-nav w-full">
						{children}
					</HeroHighlight>
				</body>
			</html>
		</ClerkProvider>
	);
}
