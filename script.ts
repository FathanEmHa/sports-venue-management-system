import * as z from "zod";
import bcrypt from "bcrypt";
import { prisma } from "./lib/prisma";

async function main() {
	/* CREATE */

	// USER
	// const hashedPassword = await bcrypt.hash("agung", 10);
	// const userCreate = await prisma.user.create({
	// 	data: {
	// 		name: "Agung",
	// 		email: "Agung@mail.com",
	// 		password: hashedPassword,
	// 	},
	// });
	// console.log("Data user: ", userCreate);

	// VENUE TYPE
	// const venueTypeCreate = await prisma.venueType.create({
	// 	data: {
	// 		name: "Olahraga",
	// 	},
	// });
	// console.log("Venue Tyoe: ", venueTypeCreate);

	// VENUE
	// const venueCreate = await prisma.venue.create({
	// 	data: {
	// 		venueTypeId: 1,
	// 		name: "Lapangan Badminton",
	// 		price: 40000,
	// 		location: "Timur",
	// 		imageUrl: "/uploads/badminton.jpg",
	// 	},
	// 	include: {
	// 		venueType: true,
	// 	},
	// });
	// console.log("Venue: ", venueCreate);

	// BOOKING
	// const bookingCreate = await prisma.booking.create({
	// 	data: {
	// 		userId: 3,
	// 		venueId: 1,
	// 		bookingDate: new Date("2026-06-01"),
	// 		startHour: 9,
	// 		endHour: 11,
	// 	},
	// 	include: {
	// 		user: true,
	// 		venue: true,
	// 	},
	// });
	// console.log("Booking: ", bookingCreate);


	/* UPDATE */

	// USER
	// const userUpdate = await prisma.user.update({ // Ada juga updateMany()
	// 	where: {
	// 		email: "Agung@mail.com",
	// 	},
	// 	data: {
	// 		name: "Fathan",
	// 		email: "fathan@mail.com",
	// 	},
	// });
	// console.log("User: ", userUpdate);

	// VENUE TYPE
	// const venuTypeUpdate = await prisma.venueType.update({
	// 	where: {
	// 		id: 1,
	// 	},
	// 	data: {
	// 		name: "Lapangan Zumba"
	// 	},2613
	// });
	// console.log("Venue Type Update: ", venuTypeUpdate);

	// VENUE
	// const venueUpdate = await prisma.venue.update({
	// 	where: {
	// 		id: 1,
	// 	},
	// 	data: {
	// 		price: 50000,
	// 		location: "Barat",
	// 	},
	// });
	// console.log("Venue Update: ", venueUpdate);

	// BOOKINGS
	// const bookingUpdate = await prisma.booking.update({
	// 	where: {
	// 		id: 1,
	// 	},
	// 	data: {
	// 		userId: 4,
	// 	},
	// });
	// console.log("Booking Update: ", bookingUpdate);


	/* DELETE */

	// USER
	// const deleteUser = await prisma.user.update({
	// 	where: {
	// 		id: 4,
	// 	},

	// 	data: {
	// 		deletedAt: new Date(),
	// 	},
	// });
	// console.log("Soft delete user: ", deleteUser);


	/* READ */

	// USER
	// const allUsers = await prisma.user.findMany({
	// 	where: {
	// 		deletedAt: null,
	// 	},
	// 	include: {
	// 		bookings: true,
	// 	},
	// });
	// console.log("All users:", JSON.stringify(allUsers, null, 2));

	// // VENUE TYPE
	// const allVenueType = await prisma.venueType.findMany({
	// 	include: {
	// 		venues: true,
	// 	},
	// });
	// console.log("All Venue Type: ", JSON.stringify(allVenueType, null, 2));

	// // VENUE
	// const allVenue = await prisma.venue.findMany({
	// 	include: {
	// 		bookings: true
	// 	},
	// });
	// console.log("All Venue: ", JSON.stringify(allVenue, null, 2));

	// // BOOKING
	// const allBookings = await prisma.booking.findMany({
	// 	include: {
	// 		user: true,
	// 		venue: true,
	// 	},
	// });
	// console.log("All Bookings: ", JSON.stringify(allBookings, null, 2));


	/* Validasi */

	// REGISTRASI
	// const inputUser = {
	// 	name: "jan",
	// 	email: "jan@mail.com",
	// 	password: "jan123",
	// };

	// const schema = z.object({
	// 	name: z.string().min(3, "Nama minimal 3 karakter"),
	// 	email: z.string().email("Format email tidak valid"),
	// 	password: z.string().min(6, "Password minimal berisikan 6 huruf"),
	// });

	// const result = schema.safeParse(inputUser);

	// if (!result.success) {
	// 	console.log(result.error.flatten());

	// 	return;
	// };

	// const validated = result.data;

	// const existing = await prisma.user.findUnique({
	// 	where: {
	// 		email: validated.email,
	// 	},
	// });

	// if (existing) {
	// 	throw new Error("Email already exist");
	// };

	// const hashedPassword = await bcrypt.hash(
	// 	validated.password,
	// 	10
	// 	);

	// const user =  await prisma.user.create({
	// 	data: {
	// 		name: validated.name,
	// 		email: validated.email,
	// 		password: hashedPassword,
	// 	},
	// 	select: {
	// 		id: true,
	// 		name: true,
	// 		email: true,
	// 		createdAt: true,
	// 	},
	// });

	// console.log("User berhasil dibuat: ", user);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		if (e instanceof Error) {
			console.error("ERROR MESSAGE: ");
			console.error(e.message);

			console.error("ERROR STACK: ");
			console.error(e.stack);
		} else {
			console.error(e);
		}

		await prisma.$disconnect();
		process.exit(1);
	});