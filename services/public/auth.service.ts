import { prisma } from "@/lib/prisma";
import { registerScheme, RegisterInput } from "@/validators/public/auth.validator";
import { ConflictError, ValidationError } from "@/exceptions/errors";
import { hashPassword } from "@/lib/bcrypt";

export async function register() {
	const RegisterInput = {
		name: "njing123",
		email: "njing@mail.com",
		password: "njing123",
	};

	const validatedResult = registerScheme.safeParse(RegisterInput);

	if (!validatedResult.success) {
		throw new ValidationError(
			validatedResult.error.flatten().fieldErrors
		);

		return;
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

	console.log("User created: ", user);
};

register()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		if (e instanceof ValidationError) {
			console.log(e.errors);
		}

		if (e instanceof Error) {
			console.error(e.message);
		} else {
			console.error(e);
		}

		await prisma.$disconnect();
		process.exit(1);
	});