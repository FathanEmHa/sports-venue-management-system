import { AppError } from "./app-error";

export class ValidationError extends AppError {
	constructor (
		public errors: Record<String, string[]>,
		message: "Validation Failed"
	) {
		super(message, 422);
	}
}