import { cookies } from "next/headers";
import { successResponse } from "@/lib/api-response";

export async function POST() {
	(await cookies()).delete(
		"token"
	);

	return successResponse(
		{
			message:
				"Logged out successfully",
		}
	);
}