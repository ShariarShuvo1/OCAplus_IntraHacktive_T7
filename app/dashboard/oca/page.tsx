const Dashboard = () => {
	return (
		<main className="flex-1 lg:ml-64 p-6 h-full">
			<header className="rounded-lg p-4 flex justify-between items-center mb-6">
				<h2 className="text-lg font-semibold">Overview</h2>
				<button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
					Add New
				</button>
			</header>

			<section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				<div className="bg-slate-900 rounded-lg p-6">
					<h3 className="text-lg font-medium mb-2">Statistics</h3>
					<p className="text-gray-400">Overview of your metrics.</p>
				</div>
				<div className="bg-slate-900 rounded-lg p-6">
					<h3 className="text-lg font-medium mb-2">
						Recent Activity
					</h3>
					<p className="text-gray-400">User actions and updates.</p>
				</div>
				<div className="bg-slate-900 rounded-lg p-6">
					<h3 className="text-lg font-medium mb-2">Notifications</h3>
					<p className="text-gray-400">Stay updated with alerts.</p>
				</div>
			</section>
		</main>
	);
};

export default Dashboard;
