import { withErrorHandler } from "@/lib/with-error-handler";
import {
	deleteVenueTypeService,
	updateVenueTypeService,
} from "@/services/admin/venue-type.service";
import { successResponse } from "@/lib/api-response";
import { UnauthorizedError } from "@/exceptions/errors/unauthorized-error";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export const PUT = withErrorHandler(async (req, context) => {
	const token = (await cookies()).get("token")?.value;

	if (!token) {
		throw new UnauthorizedError("Unauthorized");
	}

	const payload = await verifyToken(token);

	const { id } = await context!.params;

	const body = await req.json();

	const venueType = await updateVenueTypeService(
		Number(id),
		body,
		payload.role
	);

	return successResponse(venueType);
});

export const DELETE = withErrorHandler(async (req, context) => {
	const token = (await cookies()).get("token")?.value;

	if (!token) {
		throw new UnauthorizedError("Unauthorized");
	}

	const payload = await verifyToken(token);

	const { id } = await context!.params;

	await deleteVenueTypeService(Number(id), payload.role);

	return successResponse(null);
});
