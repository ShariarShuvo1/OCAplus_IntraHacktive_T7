"use client";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { User, Calendar } from "lucide-react";
import Link from "next/link";
import "./style.css";

interface Club {
	_id: string;
	clubName: string;
	description?: string;
	logo?: string;
	totalEvents: number;
}

export default function Page() {
	const [clubs, setClubs] = useState<Club[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchClubs() {
			setLoading(true);
			const response = await fetch("/api/clubs");
			const clubs = await response.json();
			setClubs(clubs);
			setLoading(false);
		}
		fetchClubs();
	}, []);

	return (
		<div className="h-full overflow-hidden text-gray-100 p-8">
			{loading && <Spin fullscreen size="large" />}

			<div className="grid container-class overflow-y-scroll h-full gap-2 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
				{clubs.map((club: Club) => (
					<div
						key={club._id}
						className="rounded-2xl h-fit bg-gray-800 shadow-xl p-6 space-y-4 "
					>
						<div className="flex items-center space-x-4">
							{club.logo ? (
								<img
									src={club.logo}
									alt={club.clubName}
									className="w-16 h-16 rounded-full border-2 border-gray-700"
								/>
							) : (
								<div className="w-16 h-16 flex items-center justify-center bg-gray-700 rounded-full">
									<User size={32} color="white" />
								</div>
							)}
							<div>
								<Link href={`/clubs/${club._id}`}>
									<p className="text-xl font-semibold hover:text-gray-300 text-white cursor-pointer">
										{club.clubName}
									</p>
								</Link>
								<p className="text-sm text-gray-400">
									{club.description || "No description"}
								</p>
							</div>
						</div>
						<div className="flex items-center space-x-2 text-gray-300">
							<Calendar size={20} />
							<p className="text-sm">{club.totalEvents} Events</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
