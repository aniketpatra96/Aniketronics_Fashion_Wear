import connectDb from "@/middleware/DbConnect";
import Feedback from "@/models/Feedback";

const handler = async (request, response) => {
  try {
    const data = await request.json();
    const feedback = new Feedback(data);
    await feedback.save();
    return Response.json({
      message: "Your feedback is successfully submitted !",
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};

export function POST(request, response) {
  return connectDb(handler, request, response);
}
