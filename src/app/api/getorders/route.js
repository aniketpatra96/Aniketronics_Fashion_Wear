import connectDB from "@/middleware/DbConnect";
import Order from "@/models/Order";

const handler = async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userid");
    const orders = await Order.find({ userId });
    return Response.json({ orders });
  } catch (error) {
    console.error(error);
    return Response.json({ error: error.message });
  }
};

export function GET(request, response) {
  return connectDB(handler, request, response);
}
