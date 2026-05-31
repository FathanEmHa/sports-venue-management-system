import { NextResponse } from "next/server";

export abstract class AppError extends Error {
  constructor(
    public message: string,
    public status: number,
  ) {
    super(message);
    this.name = this.constructor.name;
  }

  // default response shape, bisa di-override
  toResponse() {
    return NextResponse.json(
      { error: this.message },
      { status: this.status }
    );
  }
}