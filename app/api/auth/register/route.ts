import { withErrorHandler } from "@/lib/with-error-handler";
import { successResponse } from "@/lib/api-response";

export const POST = withErrorHandler(
	async (req) => {
		const body = await req.json();

		const user =
			await registerService(body);

		return successResponse(user, 201);
	}
);