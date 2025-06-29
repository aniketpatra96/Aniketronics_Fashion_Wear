import connectDb from "@/middleware/DbConnect";
import Account from "@/models/Account";

const handler = async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userid");
    const account = await Account.findOne({ userId });
    return Response.json({ account });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};

const putHandler = async (request, response) => {
  try {
    const data = await request.json();
    const updatedAccount = await Account.findByIdAndUpdate(
      data.accountId,
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        deliveryAddress: data.address,
        homeAddress: data.homeAddress,
        role: data.role,
      },
      {
        new: true,
      }
    );
    return Response.json({ updatedAccount });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};

export function GET(request, response) {
  return connectDb(handler, request, response);
}

export function PUT(request, response) {
  return connectDb(putHandler, request, response);
}
