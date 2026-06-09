import { withErrorHandler } from "@/lib/with-error-handler";
import { createVenueService } from "@/services/admin/venue-type.service";
import { successResponse } from "@/lib/api-response";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export const POST =
	withErrorHandler(
		async (req) => {
			const token =
				(await cookies())
					.get("token")
					?.value;

			if (!token) {
				throw new UnauthorizedError(
					"Login required"
				);
			}

			const payload =
				await verifyToken(
					token
				);

			const body =
				await req.json();

			const venueType =
				await createVenueService(
					body,
					payload.role
				);

			return successResponse(
				venueType,
				201
			);
		}
	);