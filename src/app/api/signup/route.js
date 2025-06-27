import User from "@/models/User";
import connectDb from "@/middleware/DbConnect";
import bcrypt from "bcryptjs";

const handler = async (request, response) => {
  try {
    const data = await request.json();
    const { username, email, password } = data;
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return Response.json({ error: "User already exists !!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = { ...data, password: hash };
    const newUser = new User(user);
    await newUser.save();
    return Response.json({
      message: "User added successfully !!",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error);
    return Response.json({ error: error.message || "Internal Server Error" });
  }
};

export function POST(request, response) {
  return connectDb(handler, request, response);
}
