import { AppError } from "./app-error";

export class NotFoundError extends AppError {
	constructor(message: string = "Data Not Found") {
		super(message, 404);
	}
}