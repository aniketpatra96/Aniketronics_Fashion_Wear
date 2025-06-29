import User from "@/models/User";
import connectDb from "@/middleware/DbConnect";
import { NextResponse } from "next/server";

const handler = async (request, response) => {
  try {
    const data = await request.json();
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }
    return NextResponse.json({ success: true, message: "User found" });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: "Internal server error due to " + error });
  }
};

export function POST(request, response) {
  return connectDb(handler, request, response);
}
