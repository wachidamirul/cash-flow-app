import { addTransaction, deleteTransaction, transaction, transactionById } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export const GET = async request => {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json({
				status: 401,
				message: "Unauthorized"
			});
		}

		if (id) {
			const transactionDetail = await transactionById(id);
			return NextResponse.json({
				status: transactionDetail ? 200 : 404,
				message: transactionDetail ? "success" : "transaction not found",
				data: transactionDetail || {}
			});
		}

		const allTransactions = await transaction(userId);
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

export const POST = async request => {
	try {
		const searchParams = request.nextUrl.searchParams;
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json({
				status: 401,
				message: "Unauthorized"
			});
		}
		const req = await request.json();
		const res = await addTransaction(req, userId);
		return NextResponse.json(
			{
				status: res.status,
				message: res.message
			},
			{ status: res.statusCode }
		);
	} catch (error) {
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			error: error.message
		});
	}
};

export const DELETE = async request => {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");
		const userId = searchParams.get("userId");

		if (!userId) {
			return NextResponse.json({
				status: 401,
				message: "Unauthorized"
			});
		}

		await deleteTransaction(id);
		return NextResponse.json({
			status: 200,
			message: "success"
		});
	} catch (error) {
		return NextResponse.json({
			status: 500,
			message: "Internal Server Error",
			error: error.message
		});
	}
};
