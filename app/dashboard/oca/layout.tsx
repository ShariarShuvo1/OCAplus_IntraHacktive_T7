"use client";
import {
	Home,
	BarChart3,
	Settings,
	User,
	Club,
	Users,
	Link,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	return (
		<div className="h-full text-white flex flex-col lg:flex-row">
			<aside className="bg-slate-900 bg-opacity-60 lg:w-64 p-4 lg:h-full fixed bottom-0 lg:static w-full lg:flex flex-col items-center lg:items-start lg:space-y-6">
				<div className="hidden lg:block text-2xl font-bold text-center mb-6">
					Dashboard
				</div>
				<nav className="flex lg:flex-col font-bold justify-around w-full lg:w-auto">
					<div
						onClick={() => router.push("/dashboard/oca/add-club")}
						className="flex cursor-pointer flex-col lg:flex-row items-center gap-2 text-gray-300 hover:text-white p-2"
					>
						<Users className="w-6 h-6" />
						<span className="hidden lg:inline">Add Club</span>
					</div>
					<div
						onClick={() => router.push("/dashboard/oca/profile")}
						className="flex cursor-pointer flex-col lg:flex-row items-center gap-2 text-gray-300 hover:text-white p-2"
					>
						<User className="w-6 h-6" />
						<span className="hidden lg:inline">Profile</span>
					</div>
				</nav>
			</aside>
			{children}
		</div>
	);
}
