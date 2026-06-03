import { withErrorHandler } from "@/lib/with-error-handler";
import { loginService } from "@/services/public/auth.service";
import { successResponse } from "@/lib/api-response";
import { generateToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export const POST = withErrorHandler(
	async (req) => {
		const body = await req.json();

		const user =
			await loginService(body);

		const token =
			await generateToken({
				id: user.id,
				role: user.role,
			});

		(await cookies()).set(
			"token",
			token,
			{
				httpOnly: true,
				secure:
					process.env.NODE_ENV ===
					"production",
				sameSite: "lax",
				path: "/",
				maxAge:
					60 *
					60 *
					24 *
					7,
			}
		);

		return successResponse(user, 200);
	}
);