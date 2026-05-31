import { prisma } from "@/lib/prisma";
import { registerScheme, RegisterInput } from "@/validators/public/auth.validator";
import { hashPassword } from "@/lib/bcrypt";
import { ValidationError } from "@/exceptions/errors/validation-error";
import { ConflictError } from "@/exceptions/errors/conflict-error";

export async function registerService(data: RegisterInput) {

	const validatedResult = registerScheme.safeParse(data);

	if (!validatedResult.success) {
		throw new ValidationError(
			validatedResult.error.flatten().fieldErrors
		);
	};

	const validatedUser = validatedResult.data;

	const existingUser = await prisma.user.findUnique({
		where: {
			email: validatedUser.email,
		},
	});

	if (existingUser) {
		throw new ConflictError("Email already in use");
	};

	const hashedPassword =
		await hashPassword(
			validatedUser.password
		);

	const user = await prisma.user.create({
		data: {
			name: validatedUser.name,
			email: validatedUser.email,
			password: hashedPassword,
		},
		select: {
			id: true,
			name: true,
			email: true,
			createdAt: true,
		},
	});

	return user;
};