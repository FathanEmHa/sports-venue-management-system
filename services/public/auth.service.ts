import { prisma } from "@/lib/prisma";
import { registerScheme, loginScheme, RegisterInput, LoginInput } from "@/validators/public/auth.validator";
import { hashPassword, comparePassword } from "@/lib/bcrypt";
import { ValidationError } from "@/exceptions/errors/validation-error";
import { ConflictError } from "@/exceptions/errors/conflict-error";
import { UnauthorizedError } from "@/exceptions/errors/unauthorized-error";

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

export async function loginService(data: LoginInput) {

	const validatedResult = loginScheme.safeParse(data);

	if (!validatedResult.success) {
		throw new ValidationError(
			validatedResult.error.flatten().fieldErrors
		);
	};

	const validatedUser = validatedResult.data;

	const user =
		await prisma.user.findUnique({
			where: {
				email: validatedUser.email,
			},
		});

	if (!user) {
		throw new UnauthorizedError("Invalid email or password");
	};

	const isPasswordValid = 
		await comparePassword(
			validatedUser.password,
			user.password,
		);

	if (!isPasswordValid) {
		throw new UnauthorizedError("Invalid email or password");
	};

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		role: user.role,
	};

};