import { AppError } from "./app-error";

export class ValidationError extends AppError {
  constructor(public fieldErrors: Record<string, string[] | undefined>) {
    super("Validation failed", 422);
  }

  // override karena shape-nya beda
  toResponse() {
    return NextResponse.json(
      { errors: this.fieldErrors },
      { status: this.status }
    );
  }
}