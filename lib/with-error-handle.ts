import { AppError } from "@/exceptions/errors/app-error";
import { ValidationError } from "@/exceptions/errors/validation-error";
import { errorResponse } from "./api-response";

export function withErrorHandler(
  handler: (req: Request) => Promise<Response>
) {
  return async (req: Request) => {
    try {
      return await handler(req);
    } catch (error) {
      if (error instanceof ValidationError) {
        return errorResponse(
          error.message,
          error.statusCode,
          error.errors
        );
      }

      if (error instanceof AppError) {
        return errorResponse(
          error.message,
          error.statusCode
        );
      }

      return errorResponse(
        "Internal Server Error",
        500
      );
    }
  };
}