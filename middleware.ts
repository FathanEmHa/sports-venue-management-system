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

	// Public pages
	const isAuthPage =
		pathname === "/login" ||
		pathname === "/register";

	if (token) {
		try {
			await verifyToken(token);

			if (isAuthPage) {
				return NextResponse.redirect(
					new URL(
						"/dashboard",
						req.url
					)
				);
			}

			return NextResponse.next();
		} catch {}
	}

	// Protected pages
	const isProtected =
		pathname.startsWith(
			"/dashboard"
		) ||
		pathname.startsWith(
			"/bookings"
		) ||
		pathname.startsWith(
			"/profile"
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

export const config = {
	matcher: [
		"/login",
		"/register",
		"/dashboard/:path*",
		"/bookings/:path*",
		"/profile/:path*",
	],
};