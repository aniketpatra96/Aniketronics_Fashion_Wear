import Order from "@/models/Order";
import connectDB from "@/middleware/DbConnect";

const handler = async (request, response) => {
  try {
    const data = await request.json();
    const order = new Order(data);
    await order.save();
    return Response.json({ message: "Successfully created your Order....." });
  } catch (err) {
    return Response.json({ error: err });
  }
};

export function POST(request, response) {
  return connectDB(handler, request, response);
}

export function GET(request, response) {
  return Response.json({ error: "GET /createorder is not allowed..." });
}
