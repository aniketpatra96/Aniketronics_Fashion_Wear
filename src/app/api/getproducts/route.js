import { Tshirt, Hoody, Sticker, Mug } from "@/models/Product";
import connectDB from "@/middleware/DbConnect";

const handler = async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    let query = {};
    if (category === "T-Shirt") {
      query.category = category;
      const tshirts = await Tshirt.find(query);
      return Response.json({ tshirts });
    }
    else if (category === "Hoody") {
      query.category = category;
      const hoodies = await Hoody.find(query);
      return Response.json({ hoodies });
    }
    else if(category === "Sticker") {
      query.category = category;
      const stickers = await Sticker.find(query);
      return Response.json({ stickers });
    }
    else if(category === "Mug") {
      query.category = category;
      const mugs = await Mug.find(query);
      return Response.json({ mugs });
    }
    else {
      throw new Error("Category does not exist !!");
    }
  } catch (error) {
    return Response.json({ error: error.message });
  }
};

export function GET(request, response) {
  return connectDB(handler, request, response);
}
