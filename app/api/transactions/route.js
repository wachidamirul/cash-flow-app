import { retriveData, retriveDataById } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    const detailTransaction = await retriveDataById("transactions", id);
    if (detailTransaction) {
      return NextResponse.json({
        status: 200,
        message: "success",
        data: detailTransaction,
      });
    }

    return NextResponse.json({
      status: 404,
      message: "transaction not found",
      data: {},
    });
  }

  const transactions = await retriveData("transactions");
  return NextResponse.json({
    status: 200,
    message: "success",
    data: transactions,
  });
};
