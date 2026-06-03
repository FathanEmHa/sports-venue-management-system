import { withErrorHandler } from "@/lib/with-error-handler";
import { loginService } from "@/services/public/auth.service";
import { successResponse } from "@/lib/api-response";

export const POST = withErrorHandler(
	async (req) => {
		const body = await req.json();

		const user =
			await loginService(body);

		return successResponse(user, 200);
	}
);