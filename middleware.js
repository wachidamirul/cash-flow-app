import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const AUTH_SECRET = process.env.NEXT_AUTH_SECRET;

export async function middleware(req) {
	const token = await getToken({ req, secret: AUTH_SECRET });

	if (!token) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/"]
};
