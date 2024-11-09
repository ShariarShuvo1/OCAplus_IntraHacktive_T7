import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./style.css";

interface Room {
	_id: string;
	roomNumber: string;
}

export const CardEffect = ({
	rooms,
	className,
}: {
	rooms: Room[];
	className?: string;
}) => {
	let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	return (
		<div
			className={cn(
				"grid grid-cols-1 container-class sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-2 h-full overflow-y-scroll",

				className
			)}
		>
			{rooms.map((room, idx) => (
				<div
					key={idx}
					className="relative group h-full block p-2 w-full"
					onMouseEnter={() => setHoveredIndex(idx)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<AnimatePresence>
						{hoveredIndex === idx && (
							<motion.span
								className="absolute inset-0 h-full w-full bg-gradient-to-r from-rose-100 via-fuchsia-100 to-teal-100 dark:bg-slate-800/[0.8] block  rounded-3xl"
								layoutId="hoverBackground"
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: { duration: 0.15 },
								}}
								exit={{
									opacity: 0,
									transition: { duration: 0.15, delay: 0.2 },
								}}
							/>
						)}
					</AnimatePresence>
					<Card roomNumber={room.roomNumber}>
						<CardTitle>{room.roomNumber}</CardTitle>
					</Card>
				</div>
			))}
		</div>
	);
};

export const Card = ({
	className,
	children,
	roomNumber,
}: {
	className?: string;
	children: React.ReactNode;
	roomNumber: string;
}) => {
	const [editClicked, setEditClicked] = useState(false);
	const [newRoomNumber, setNewRoomNumber] = useState<string>(roomNumber);
	return (
		<div
			className={cn(
				"rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
				className
			)}
		>
			<div className="relative z-50">
				<div className="p-4">
					<div className="flex flex-col gap-12 justify-between">
						{editClicked && (
							<input
								type="text"
								value={newRoomNumber}
								onChange={(e) =>
									setNewRoomNumber(e.target.value)
								}
								placeholder="Room Number"
								className=" bg-slate-900 p-2 rounded-lg font-bold tracking-wide mt-4 text-xl lg:2text-lg xl:text-3xl 2xl:text-4xl"
								title="Room Number"
							/>
						)}
						{!editClicked && children}

						<div className="flex flex-col md:flex-row gap-2 text-white font-semibold w-full">
							{!editClicked && (
								<>
									<button
										onClick={() => setEditClicked(true)}
										className=" w-full px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-700"
									>
										Edit
									</button>
									<button className="bg-red-700 w-full hover:bg-red-800 px-4 py-2 rounded-lg">
										Delete
									</button>
								</>
							)}
							{editClicked && (
								<>
									<button
										onClick={() => setEditClicked(false)}
										className="bg-indigo-600 hover:bg-indigo-700 w-full px-4 py-2 rounded-lg"
									>
										Save
									</button>
									<button
										onClick={() => setEditClicked(false)}
										className="bg-gray-600 hover:bg-gray-700 w-full px-4 py-2 rounded-lg"
									>
										Cancel
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export const CardTitle = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<h4
			className={cn(
				"text-zinc-100 p-2 font-bold tracking-wide mt-4 text-xl lg:2text-lg xl:text-3xl 2xl:text-4xl",
				className
			)}
		>
			{children}
		</h4>
	);
};
