import { AppError } from "./app-error";

export class ConflictError extends AppError {
	constructor (
		message: "Data Conflict"
	) {
		super(message, 409);
	}
}