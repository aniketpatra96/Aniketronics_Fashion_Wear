import { Tshirt, Hoody, Sticker, Mug } from "@/models/Product";
import connectDB from "@/middleware/DbConnect";

const handler = async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const category = searchParams.get("category");
    let query = {};
    if (slug && category === "T-Shirt") {
      query.slug = decodeURIComponent(slug);
      query.category = decodeURIComponent(category);
      const tshirt = await Tshirt.findOne(query);
      return Response.json({ tshirt });
    } else if (slug && category === "Hoody") {
      query.slug = decodeURIComponent(slug);
      query.category = decodeURIComponent(category);
      const hoody = await Hoody.findOne(query);
      return Response.json({ hoody });
    } else if (slug && category === "Sticker") {
      query.slug = decodeURIComponent(slug);
      query.category = decodeURIComponent(category);
      const sticker = await Sticker.findOne(query);
      return Response.json({ sticker });
    } else if (slug && category === "Mug") {
      query.slug = decodeURIComponent(slug);
      query.category = decodeURIComponent(category);
      const mug = await Mug.findOne(query);
      return Response.json({ mug });
    } else {
      throw new Error("Category is required");
    }
  } catch (error) {
    return Response.json({ error: error.message });
  }
};

export function GET(request, response) {
  return connectDB(handler, request, response);
}
