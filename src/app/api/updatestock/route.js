import { Tshirt, Hoody, Mug, Sticker } from "@/models/Product";
import connectDB from "@/middleware/DbConnect";

const handler = async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const updatedData = await request.json();
    if (category === "Mug" || category === "Sticker") {
      if (category === "Mug") {
        await Mug.findByIdAndUpdate(updatedData.productId, {
          availableQty: updatedData.availableQty,
        });
      } else {
        await Sticker.findByIdAndUpdate(updatedData.productId, {
          availableQty: updatedData.availableQty,
        });
      }
    }
    if (category === "T-Shirt" || category === "Hoody") {
      if (category === "T-Shirt") {
        await Tshirt.findByIdAndUpdate(updatedData.productId, {
          availableQty: updatedData.availableQty,
        });
      } else {
        await Hoody.findByIdAndUpdate(updatedData.productId, {
          availableQty: updatedData.availableQty,
        });
      }
    }
    return Response.json({
      message: `Successfully updated the ${category}.....`,
    });
  } catch (err) {
    return Response.json({ error: err });
  }
};

export function PUT(request, response) {
  return connectDB(handler, request, response);
}
