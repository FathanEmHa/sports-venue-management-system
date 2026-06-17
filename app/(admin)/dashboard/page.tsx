export default function DashboardPage() {
	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
			<div className="rounded-xl border bg-card p-6">
				<p className="text-sm text-muted-foreground">
					Users
				</p>

				<h2 className="mt-2 text-3xl font-bold">
					120
				</h2>
			</div>

			<div className="rounded-xl border bg-card p-6">
				<p className="text-sm text-muted-foreground">
					Venues
				</p>

				<h2 className="mt-2 text-3xl font-bold">
					18
				</h2>
			</div>

			<div className="rounded-xl border bg-card p-6">
				<p className="text-sm text-muted-foreground">
					Bookings
				</p>

				<h2 className="mt-2 text-3xl font-bold">
					45
				</h2>
			</div>

			<div className="rounded-xl border bg-card p-6">
				<p className="text-sm text-muted-foreground">
					Pending
				</p>

				<h2 className="mt-2 text-3xl font-bold">
					7
				</h2>
			</div>
		</div>
	);
}