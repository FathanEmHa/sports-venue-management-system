"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
	LayoutDashboard,
	MapPinned,
	CalendarDays,
	Users,
	Shapes,
} from "lucide-react";

export default function AdminSidebar() {
	const pathname =
		usePathname();

	const menus = [
		{
			label: "Dashboard",
			href: "/dashboard",
			icon: LayoutDashboard,
		},
		{
			label: "Venue Types",
			href: "/venue-types",
			icon: Shapes,
		},
		{
			label: "Venues",
			href: "/venues",
			icon: MapPinned,
		},
		{
			label: "Bookings",
			href: "/bookings",
			icon: CalendarDays,
		},
		{
			label: "Users",
			href: "/users",
			icon: Users,
		},
	];

	return (
		<aside className="h-screen w-64 border-r bg-card">
			<div className="border-b p-6">
				<h1 className="text-xl font-bold">
					Sports Booking
				</h1>

				<p className="text-sm text-muted-foreground">
					Admin Panel
				</p>
			</div>

			<nav className="p-4">
				<div className="flex flex-col gap-2">
					{menus.map(
						(menu) => {
							const Icon =
								menu.icon;

							const isActive =
								pathname.startsWith(
									menu.href
								);

							return (
								<Link
									key={
										menu.href
									}
									href={
										menu.href
									}
									className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors
										${
											isActive
												? "bg-brand text-brand-foreground"
												: "hover:bg-muted"
										}
									`}
								>
									<Icon className="h-5 w-5" />

									<span>
										{
											menu.label
										}
									</span>
								</Link>
							);
						}
					)}
				</div>
			</nav>
		</aside>
	);
}