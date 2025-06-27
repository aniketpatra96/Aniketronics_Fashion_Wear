import connectDB from "@/middleware/DbConnect";
import Order from "@/models/Order";

const handler = async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");
    const order = await Order.findById(orderId);
    if (!order) {
      return new Response(JSON.stringify({ error: "Order not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(order), {
      status: 200,
    });
  } catch (error) {
    return Response.json({ error });
  }
};

export function GET(request, response) {
  return connectDB(handler, request, response);
}
