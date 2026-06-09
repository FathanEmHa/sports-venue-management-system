import { ForbiddenError } from "@/exceptions/errors/forbidden-error";

export function requireRole(
	role: string,
	allowedRoles: string[]
) {
	if (!allowedRoles.includes(role)) {
		throw new ForbiddenError(
			"Access denied"
		);
	}
}