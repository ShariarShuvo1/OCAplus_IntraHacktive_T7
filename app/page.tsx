"use client";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { motion } from "framer-motion";
import { User, ArrowLeft, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer/Footer";

interface Event {
	_id: string;
	name: string;
	description: string;
	startDate: Date;
	endDate: Date;
	cover: string;
}

interface Club {
	_id: string;
	clubName: string;
	description?: string;
	logo?: string;
}

const Home = () => {
	const [events, setEvents] = useState<Event[]>([]);
	const [clubs, setClubs] = useState<Club[]>([]);
	const [gallery, setGallery] = useState<string[]>([]);
	const [loading, setLoading] = useState(true);
	const [currentImage, setCurrentImage] = useState(0);

	useEffect(() => {
		async function fetchData() {
			try {
				const [eventsRes, clubsRes, galleryRes] = await Promise.all([
					fetch("/api/events"),
					fetch("/api/clubs"),
					fetch("/api/gallery"),
				]);
				const eventsData = await eventsRes.json();
				const clubsData = await clubsRes.json();
				const galleryData = await galleryRes.json();
				setEvents(eventsData);
				setClubs(clubsData);
				setGallery(galleryData);
			} catch {
				toast.error("Failed to load data");
			}
			setLoading(false);
		}
		fetchData();
	}, []);

	const handlePrevImage = () =>
		setCurrentImage((prev) => (prev - 1 + gallery.length) % gallery.length);
	const handleNextImage = () =>
		setCurrentImage((prev) => (prev + 1) % gallery.length);

	if (loading) return <Spin size="large" fullscreen />;

	return (
		<div className=" text-gray-100 p-8 h-full space-y-20 overflow-y-auto">
			<motion.section
				className="text-center space-y-6"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h1 className="text-5xl font-bold">Welcome to Our Community</h1>
				<p className="text-gray-300 text-lg max-w-2xl mx-auto">
					Join us for exciting events, connect with clubs, and explore
					our gallery.
				</p>
				<div className="flex justify-center space-x-4">
					<Link href="/events" className="button-class">
						Explore Events
					</Link>
					<Link href="/clubs" className="button-class">
						Discover Clubs
					</Link>
				</div>
			</motion.section>

			<motion.section
				className="space-y-6"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="text-3xl font-semibold text-center">
					Upcoming Events
				</h2>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{events.map((event) => (
						<motion.div
							key={event._id}
							className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
							whileHover={{ scale: 1.05 }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<img
								src={event.cover}
								alt={event.name}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4 space-y-2">
								<Link href={`/events/${event._id}`}>
									<h3 className="text-2xl font-semibold text-white cursor-pointer hover:text-gray-300">
										{event.name}
									</h3>
								</Link>
								<p className="text-sm text-gray-300 line-clamp-3">
									{event.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</motion.section>

			<motion.section
				className="space-y-6"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="text-3xl font-semibold text-center">
					Our Clubs
				</h2>
				<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
					{clubs.map((club) => (
						<motion.div
							key={club._id}
							className="bg-gray-800 rounded-lg shadow-md p-4 flex items-center space-x-4"
							whileHover={{ scale: 1.05 }}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							{club.logo ? (
								<img
									src={club.logo}
									alt={club.clubName}
									className="w-16 h-16 rounded-full"
								/>
							) : (
								<div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
									<User size={32} color="white" />
								</div>
							)}
							<div>
								<Link href={`/clubs/${club._id}`}>
									<h3 className="text-xl font-semibold text-white cursor-pointer hover:text-gray-300">
										{club.clubName}
									</h3>
								</Link>
								<p className="text-sm text-gray-400 line-clamp-2">
									{club.description}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</motion.section>

			<motion.section
				className="space-y-6 text-center"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.8 }}
			>
				<h2 className="text-3xl font-semibold">Gallery</h2>
				<div className="relative flex justify-center items-center">
					<motion.button
						title="Previous Image"
						onClick={handlePrevImage}
						className="absolute left-4 text-gray-400"
						whileTap={{ scale: 0.9 }}
					>
						<ArrowLeft size={36} />
					</motion.button>
					<motion.img
						title="Gallery Image"
						src={gallery[currentImage]}
						alt={`Gallery image ${currentImage + 1}`}
						className="w-full max-w-3xl h-80 object-cover rounded-lg shadow-md"
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
					/>
					<motion.button
						title="Next Image"
						onClick={handleNextImage}
						className="absolute right-4 text-gray-400"
						whileTap={{ scale: 0.9 }}
					>
						<ArrowRight size={36} />
					</motion.button>
				</div>
			</motion.section>

			<Footer />
		</div>
	);
};

export default Home;
