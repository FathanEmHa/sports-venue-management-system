import LogoutButton from "@/components/shared/logout-button";

export default function DashboardPage() {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold">
				Dashboard
			</h1>

			<LogoutButton />
		</div>
	);
}