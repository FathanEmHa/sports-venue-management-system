import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

import { hashPassword } from "../lib/bcrypt";

const connectionString =
	process.env.DATABASE_URL!;

const adapter =
	new PrismaPg({
		connectionString,
	});

const prisma =
	new PrismaClient({
		adapter,
	});

async function main() {
	const hashedPassword =
		await hashPassword(
			"admin123"
		);

	await prisma.user.create({
		data: {
			name: "Admin",
			email:
				"admin@mail.com",
			password:
				hashedPassword,
			role: "ADMIN",
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});