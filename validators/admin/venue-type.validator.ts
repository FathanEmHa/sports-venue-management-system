import * as z from "zod";

export const venueTypeScheme = z.object({
	name: z.string().min(3, "Name must contain at least 3 letters"),
});

export type VenueTypeInput = z.infer<typeof venueTypeScheme>;