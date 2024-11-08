"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { signOut, isSignedIn } = useAuth();

	return (
		<nav className="bg-gray-900 text-gray-100 shadow-lg">
			<div className="mx-auto px-6">
				<div className="flex justify-between h-16">
					<div className="flex items-center">
						<Link href="/" className="text-xl font-bold">
							<Image
								src="/assets/logo-white.png"
								alt="Logo"
								width={100}
								height={40}
							/>
						</Link>
					</div>
					<div className="hidden md:flex items-center space-x-4">
						<Link href="/" className="hover:text-gray-400">
							Home
						</Link>
						<Link href="/about" className="hover:text-gray-400">
							About
						</Link>
						<Link href="/contact" className="hover:text-gray-400">
							Contact
						</Link>
						{isSignedIn && (
							<Link
								href="/dashboard"
								className="hover:text-gray-400"
							>
								Dashboard
							</Link>
						)}
						{isSignedIn && (
							<button
								onClick={() => signOut()}
								className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								Sign Out
							</button>
						)}
						{!isSignedIn && (
							<Link
								href="/sign-in"
								className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
							>
								Sign In
							</Link>
						)}
					</div>
					<div className="flex md:hidden items-center">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-gray-100"
						>
							{isOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden bg-gray-800">
					<Link
						href="/"
						className="block px-4 py-2 hover:bg-gray-700"
					>
						Home
					</Link>
					<Link
						href="/about"
						className="block px-4 py-2 hover:bg-gray-700"
					>
						About
					</Link>
					<Link
						href="/contact"
						className="block px-4 py-2 hover:bg-gray-700"
					>
						Contact
					</Link>
					{isSignedIn && (
						<Link
							href="/dashboard"
							className="block px-4 py-2 hover:bg-gray-700"
						>
							Dashboard
						</Link>
					)}
					{isSignedIn && (
						<button
							onClick={() => signOut()}
							className="w-full bg-blue-600 text-white px-4 py-2 mt-2 hover:bg-blue-700"
						>
							Sign Out
						</button>
					)}
					{!isSignedIn && (
						<Link
							href="/sign-in"
							className="w-full bg-blue-600 text-white px-4 py-2 mt-2 hover:bg-blue-700"
						>
							Sign In
						</Link>
					)}
				</div>
			)}
		</nav>
	);
};

export default Navbar;
