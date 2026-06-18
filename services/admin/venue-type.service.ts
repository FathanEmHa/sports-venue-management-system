import { prisma } from "@/lib/prisma";
import { venueTypeScheme, VenueTypeInput } from "@/validators/admin/venue-type.validator";
import { ValidationError } from "@/exceptions/errors/validation-error";
import { ConflictError } from "@/exceptions/errors/conflict-error";
import { requireRole } from "@/lib/permissions";

export async function createVenueTypeService(
	data: VenueTypeInput,
	role: string
) {

	requireRole(role, [
		"ADMIN",
	]);

	const validatedResult = venueTypeScheme.safeParse(data);

	if (!validatedResult.success) {
		throw new ValidationError(
			validatedResult.error.flatten().fieldErrors
		);
	};

	const validatedVenueType = validatedResult.data;

	const existingVenueType = await prisma.venueType.findUnique({
		where: {
			name: validatedVenueType.name,
		},
	});

	if (existingVenueType) {
		throw new ConflictError("Venue type already exist");
	};

	const venueType = await prisma.venueType.create({
		data: {
			name: validatedVenueType.name,
		},
		select: {
			id: true,
			name: true,
			createdAt: true,
		},
	});

	return venueType;
}

export async function getVenueTypesService() {
	return prisma.venueType.findMany({
		orderBy: {
			id: "desc",
		},
		select: {
			id: true,
			name: true,
			createdAt: true,
		},
	});
}