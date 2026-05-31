import * as z from "zod";

export const registerScheme = z.object({
	name: z.string().min(3, "Name must contain at least 3 letters"),
	email: z.string().email("Format email invalid"),
	password: z.string().min(6, "Password must contain at least 6 letters"),
});

export type RegisterInput = z.infer<typeof registerScheme>;