import User from "@/models/User";
import connectDb from "@/middleware/DbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const handler = async (request, response) => {
  try {
    const data = await request.json();
    const { username, password } = data;
    const user = await User.findOne({ username });
    if (!user) {
      return Response.json({ error: "User does not exists !!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ error: "Password is Incorrect !!" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        password: user.password,
        isAdmin: user.isAdmin,
        profilePicture: user.profilePicture,
      },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: "4h" }
    );
    return Response.json({ message: "Login Successfully !!", token });
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json({ error: error.message || "Internal Server Error" });
  }
};

export function POST(request, response) {
  return connectDb(handler, request, response);
}
