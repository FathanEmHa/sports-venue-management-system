import { prisma } from "@/lib/prisma";
import {
	venueTypeScheme,
	VenueTypeInput,
} from "@/validators/admin/venue-type.validator";
import { ValidationError } from "@/exceptions/errors/validation-error";
import { ConflictError } from "@/exceptions/errors/conflict-error";
import { NotFoundError } from "@/exceptions/errors/not-found-error";
import { requireRole } from "@/lib/permissions";

// ─────────────────────────────────────────────
// READ (no role check — middleware enforces it)
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────────
export async function createVenueTypeService(
	data: VenueTypeInput,
	role: string
) {
	requireRole(role, ["ADMIN"]);

	const validatedResult = venueTypeScheme.safeParse(data);

	if (!validatedResult.success) {
		throw new ValidationError(
			validatedResult.error.flatten().fieldErrors
		);
	}

	const validatedVenueType = validatedResult.data;

	const existingVenueType = await prisma.venueType.findUnique({
		where: {
			name: validatedVenueType.name,
		},
	});

	if (existingVenueType) {
		throw new ConflictError("Venue type already exists");
	}

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

// ─────────────────────────────────────────────
// UPDATE
// ─────────────────────────────────────────────
export async function updateVenueTypeService(
	id: number,
	data: VenueTypeInput,
	role: string
) {
	requireRole(role, ["ADMIN"]);

	const validatedResult = venueTypeScheme.safeParse(data);

	if (!validatedResult.success) {
		throw new ValidationError(
			validatedResult.error.flatten().fieldErrors
		);
	}

	const validatedVenueType = validatedResult.data;

	const existing = await prisma.venueType.findUnique({
		where: { id },
	});

	if (!existing) {
		throw new NotFoundError("Data Not Found");
	}

	const duplicate = await prisma.venueType.findFirst({
		where: {
			name: validatedVenueType.name,
			NOT: { id },
		},
	});

	if (duplicate) {
		throw new ConflictError("Venue type name already exists");
	}

	return prisma.venueType.update({
		where: { id },
		data: {
			name: validatedVenueType.name,
		},
		select: {
			id: true,
			name: true,
			createdAt: true,
		},
	});
}

// ─────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────
export async function deleteVenueTypeService(
	id: number,
	role: string
) {
	requireRole(role, ["ADMIN"]);

	const existing = await prisma.venueType.findUnique({
		where: { id },
	});

	if (!existing) {
		throw new NotFoundError("Data Not Found");
	}

	return prisma.venueType.delete({
		where: { id },
	});
}