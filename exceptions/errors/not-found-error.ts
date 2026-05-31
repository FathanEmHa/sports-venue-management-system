import { AppError } from "./app-error";

export class NotFoundError extends AppError {
	constructor (
		message: "Data Not Found"
	) {
		super(message, 404);
	}
}