import User from "@/models/User";
import connectDb from "@/middleware/DbConnect";
import bcrypt from "bcryptjs";
const handler = async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userid");
    const user = await User.findById(userId);
    if (!user) {
      return Response.json({ error: "User not found" });
    }
    return Response.json({ user });
  } catch (err) {
    console.error("Failed to fetch account", err);
    return Response.json({ error: "Internal server error due to " + err });
  }
};

const putHandler = async (request, response) => {
  try {
    const data = await request.json();
    let updatedUser;
    if (data.url) {
      updatedUser = await User.findByIdAndUpdate(
        data.userId,
        { profilePicture: data.url },
        { new: true }
      );
    }
    if (data.username) {
      updatedUser = await User.findByIdAndUpdate(
        data.userId,
        { username: data.username },
        { new: true }
      );
    }
    if (data.email) {
      return Response.json({ error: "Email cannot be updated" });
    }
    if (data.password && data.password !== "" && data.password !== null) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updatedUser = await User.findByIdAndUpdate(
        data.userId,
        { password: hashedPassword },
        { new: true }
      );
    }
    return Response.json({ updatedUser });
  } catch (err) {
    console.error("Failed to fetch account", err);
    return Response.json({ error: "Internal server error due to " + err });
  }
};

export function GET(request, response) {
  return connectDb(handler, request, response);
}

export function PUT(request, response) {
  return connectDb(putHandler, request, response);
}
