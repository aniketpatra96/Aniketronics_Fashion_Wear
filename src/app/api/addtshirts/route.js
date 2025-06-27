import { Tshirt } from "@/models/Product";
import connectDB from "@/middleware/DbConnect";

const handler = async (request, response) => {
  try {
    const data = await request.json();
    for (let i = 0; i < data.length; i++) {
      let p = new Tshirt({
        title: data[i].title,
        slug: data[i].slug,
        desc: data[i].desc,
        img: data[i].img,
        category: data[i].category,
        size: data[i].size,
        color: data[i].color,
        price: data[i].price,
        availableQty: data[i].availableQty,
      });
      await p.save();
    }
    return Response.json({ message: "Successfully added all Products....." });
  } catch (err) {
    return Response.json({ error: err });
  }
};

export function POST(request, response) {
  return connectDB(handler, request, response);
}

export function GET(request, response) {
  return Response.json({ error: "GET /addproducts is not allowed..." });
}
