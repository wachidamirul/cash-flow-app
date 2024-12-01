import {
	addTransaction,
	deleteTransaction,
	editTransaction,
	transaction,
	transactionById
} from "@/lib/firebase/service";
import { NextResponse } from "next/server";

const handleUnauthorized = () => {
	return NextResponse.json({
		status: 401,
		message: "Unauthorized"
	});
};

const handleError = error => {
	return NextResponse.json({
		status: 500,
		message: "Internal Server Error",
		error: error.message
	});
};

export const GET = async request => {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");
		const userId = searchParams.get("userId");

		if (!userId) {
			return handleUnauthorized();
		}

		if (id) {
			const transactionDetail = await transactionById(id);
			return NextResponse.json({
				status: transactionDetail ? 200 : 404,
				message: transactionDetail ? "Success" : "Transaction not found",
				data: transactionDetail || {}
			});
		}

		const allTransactions = await transaction(userId);
		return NextResponse.json({
			status: 200,
			message: "Success",
			data: allTransactions
		});
	} catch (error) {
		return handleError(error);
	}
};

export const PUT = async request => {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");
		const userId = searchParams.get("userId");

		if (!userId) {
			return handleUnauthorized();
		}

		const req = await request.json();
		const res = await editTransaction(req, userId, id);
		return NextResponse.json(
			{
				status: res.status,
				message: res.message
			},
			{ status: res.statusCode }
		);
	} catch (error) {
		return handleError(error);
	}
};

export const POST = async request => {
	try {
		const searchParams = request.nextUrl.searchParams;
		const userId = searchParams.get("userId");

		if (!userId) {
			return handleUnauthorized();
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
		return handleError(error);
	}
};

export const DELETE = async request => {
	try {
		const searchParams = request.nextUrl.searchParams;
		const id = searchParams.get("id");
		const userId = searchParams.get("userId");

		if (!userId) {
			return handleUnauthorized();
		}

		const res = await deleteTransaction(id, userId);
		return NextResponse.json(
			{
				status: res.status,
				message: res.message
			},
			{ status: res.statusCode }
		);
	} catch (error) {
		return handleError(error);
	}
};
