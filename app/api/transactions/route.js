import { transaction, transactionById } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export const GET = async request => {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");
		const userId = searchParams.get("userId");
		const lastVisible = searchParams.get("lastVisible");

		if (id) {
			const transactionDetail = await transactionById(id);
			return NextResponse.json({
				status: transactionDetail ? 200 : 404,
				message: transactionDetail ? "success" : "transaction not found",
				data: transactionDetail || {}
			});
		}

		const allTransactions = await transaction(userId, lastVisible);
		return NextResponse.json({
			status: 200,
			message: "success",
			data: allTransactions
		});
	} catch (error) {
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			error: error.message
		});
	}
};
