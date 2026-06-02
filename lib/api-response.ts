import { NextResponse } from "next/server";

export function successResponse(data: unknown, status = 200) {
	return NextResponse.json(
		{
			success: true,
			data,
		},
		{ status }
	);
}

export function errorResponse(
	message: string,
	status = 500,
	errors?: Record<string, string[] | undefined>
) {
	return NextResponse.json(
		{
			success: false,
			message,
			errors,
		},
		{ status }
	);
}