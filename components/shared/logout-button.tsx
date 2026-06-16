"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {
	const router = useRouter();

	async function handleLogout() {
		await fetch(
			"/api/auth/logout",
			{
				method: "POST",
			}
		);

		router.push("/login");
		router.refresh();
	}

	return (
		<Button
			onClick={
				handleLogout
			}
		>
			Logout
		</Button>
	);
}