import { AppError } from "@/exceptions/errors/app-error";
import { ValidationError } from "@/exceptions/errors/validation-error";
import { errorResponse } from "./api-response";

type RouteContext = {
  params: Promise<Record<string, string>>;
};

type RouteHandler = (
  req: Request,
  context?: RouteContext
) => Promise<Response>;

export function withErrorHandler(handler: RouteHandler) {
  return async (req: Request, context?: RouteContext) => {
    try {
      return await handler(req, context);
    } catch (error) {
      // console.error("[withErrorHandler]", error);

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