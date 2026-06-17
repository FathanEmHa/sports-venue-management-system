"use client";

import { Bell } from "lucide-react";

import LogoutButton from "@/components/shared/logout-button";

export default function AdminNavbar() {
	return (
		<header
			className="
				flex
				items-center
				justify-between
				border-b
				bg-card
				px-6
				py-4
			"
		>
			<div>
				<h1 className="text-lg font-semibold">
					Admin Dashboard
				</h1>

				<p className="text-sm text-muted-foreground">
					Manage your sports booking system
				</p>
			</div>

			<div className="flex items-center gap-4">
				<button
					className="
						rounded-lg
						p-2
						hover:bg-muted
						transition-colors
					"
				>
					<Bell className="h-5 w-5" />
				</button>

				<div
					className="
						flex
						items-center
						gap-3
					"
				>
					<div
						className="
							h-10
							w-10
							rounded-full
							bg-brand
							text-brand-foreground
							font-semibold
							flex
							items-center
							justify-center
						"
					>
						A
					</div>

					<div className="hidden sm:block">
						<p className="font-medium">
							Admin
						</p>

						<p
							className="
								text-sm
								text-muted-foreground
							"
						>
							admin@mail.com
						</p>
					</div>

					<LogoutButton />
				</div>
			</div>
		</header>
	);
}