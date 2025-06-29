import User from "@/models/User";
import connectDb from "@/middleware/DbConnect";
import bcrypt from "bcryptjs";

const handler = async (request, response) => {
  try {
    const data = await request.json();
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const updatedUser = await User.findOneAndUpdate(
      { email: data.email },
      { password: hashedPassword },
      { new: true }
    );
    if (updatedUser) {
      return Response.json({
        success: true,
        message: "Password updated successfully",
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      error: "Internal server error due to " + error,
    });
  }
};

export function PUT(request, response) {
  return connectDb(handler, request, response);
}
