import { registerUser } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export const POST = async request => {
	try {
		const req = await request.json();
		const res = await registerUser(req);

		return NextResponse.json(
			{
				status: res.status,
				message: res.message
			},
			{ status: res.statusCode }
		);
	} catch (error) {
		return NextResponse.json(
			{
				status: "error",
				message: "An error occurred while processing your request.",
				error: error.message
			},
			{ status: 500 }
		);
	}
};
