import { AppError } from "./app-error";

export class ValidationError extends AppError {
  constructor(
    public errors: Record<
      string,
      string[] | undefined
    >
  ) {
    super("Validation failed", 422);
  }
}