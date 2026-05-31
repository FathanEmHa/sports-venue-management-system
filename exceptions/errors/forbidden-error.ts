import { AppError } from "./app-error";

export class ForbiddenError extends AppError {
	constructor (
		message: "Access Denied / Forbidden"
	) {
		super(message, 403);
	}
}