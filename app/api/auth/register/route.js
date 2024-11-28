import { registerUser } from "@/lib/firebase/service";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const req = await request.json();
  const res = await registerUser(req);
  return NextResponse.json(
    {
      status: res.status,
      message: res.message,
    },
    { status: res.statusCode }
  );
};
