import connectDB from "@/middleware/DbConnect";
import Order from "@/models/Order";

const handler = async (request) => {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productid");

    const order = await Order.findOne(
      { "products.productId": productId },
      { "products.$": 1 }
    );

    if (!order) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ product: order.products[0] }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

export function GET(request) {
  return connectDB(handler, request);
}
