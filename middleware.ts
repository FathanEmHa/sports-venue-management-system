import {
	NextRequest,
	NextResponse,
} from "next/server";

import {
	verifyToken,
} from "@/lib/jwt";

export async function middleware(
	req: NextRequest
) {
	const token =
		req.cookies.get("token")
			?.value;

	const pathname =
		req.nextUrl.pathname;

	const isAuthPage =
		pathname === "/login" ||
		pathname === "/register";

	// Not logged in
	if (!token) {
		const isProtected =
			pathname.startsWith(
				"/dashboard"
			) ||
			pathname.startsWith(
				"/bookings"
			) ||
			pathname.startsWith(
				"/profile"
			) ||
			pathname.startsWith(
				"/venue-types"
			);

		if (isProtected) {
			return NextResponse.redirect(
				new URL(
					"/login",
					req.url
				)
			);
		}

		return NextResponse.next();
	}

	try {
		const payload =
			await verifyToken(
				token
			);

		// Logged in user opens login/register
		if (isAuthPage) {
			return NextResponse.redirect(
				new URL(
					"/dashboard",
					req.url
				)
			);
		}

		// Admin-only pages
		const isAdminPage =
			pathname.startsWith(
				"/venue-types"
			);

		if (
			isAdminPage &&
			payload.role !==
				"ADMIN"
		) {
			return NextResponse.redirect(
				new URL(
					"/dashboard",
					req.url
				)
			);
		}

		return NextResponse.next();
	} catch {
		const response =
			NextResponse.redirect(
				new URL(
					"/login",
					req.url
				)
			);

		response.cookies.delete(
			"token"
		);

		return response;
	}
}

export const config = {
	matcher: [
		"/login",
		"/register",

		"/dashboard/:path*",
		"/bookings/:path*",
		"/profile/:path*",

		"/venue-types/:path*",
	],
};