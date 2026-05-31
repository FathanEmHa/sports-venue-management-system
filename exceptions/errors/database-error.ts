import { AppError } from "./app-error";

export class DatabaseError extends AppError {
	constructor (
		message: "Database Error",
		public originalError?: unknown
	) {
		super(message, 500);
	}
}