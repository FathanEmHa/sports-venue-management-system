import { AppError } from "@/exceptions/errors/app-error";
import { NextRequest, NextResponse } from "next/server";

type HandlerFn = (req: NextRequest, context: any) => Promise<Response>;
export function withErrorHandler(handler: HandlerFn): HandlerFn {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (err: any) {
      if (err instanceof AppError) {
        return err.toResponse(); // ← tiap error urus dirinya sendiri
      }
      console.error('[UnhandledError]', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}