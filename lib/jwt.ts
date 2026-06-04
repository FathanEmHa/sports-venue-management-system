import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(
	process.env.JWT_SECRET
);

export async function generateToken(payload: {
	id: number;
	role: string;
}) {
	return await new SignJWT(payload)
		.setProtectedHeader({
			alg: "HS256",
		})
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(secret);
}

export type JwtPayload = {
	id: number;
	role: "ADMIN" | "USER";
};

export async function verifyToken(
	token: string
): Promise<JwtPayload> {
	const { payload } =
		await jwtVerify(token, secret);

	return payload as JwtPayload;
}