import { withErrorHandler } from "@/lib/withErrorHandler"
import { registerService } from "@/services/public/auth.service";

export const POST = withErrorHandler(
	async (req) => {
		const body = await req.json();

		const user = await registerService(body);

		return Response.json(user);
	}
);