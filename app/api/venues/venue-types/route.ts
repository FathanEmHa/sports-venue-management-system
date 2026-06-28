import { withErrorHandler } from "@/lib/with-error-handler";
import {
	createVenueTypeService,
	getVenueTypesService,
} from "@/services/admin/venue-type.service";
import { successResponse } from "@/lib/api-response";
import { UnauthorizedError } from "@/exceptions/errors/unauthorized-error";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export const GET = withErrorHandler(async () => {
	const venueTypes = await getVenueTypesService();

	return successResponse(venueTypes);
});

export const POST = withErrorHandler(async (req) => {
	const token = (await cookies()).get("token")?.value;

	if (!token) {
		throw new UnauthorizedError("Unauthorized");
	}

	const payload = await verifyToken(token);

	const body = await req.json();

	const venueType = await createVenueTypeService(body, payload.role);

	return successResponse(venueType, 201);
});