import { AppError } from "./app-error";

export class ConflictError extends AppError {
	constructor(message: string = "Data Conflict") {
		super(message, 409);
	}
}