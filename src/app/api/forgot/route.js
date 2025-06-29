import connectDb from "@/middleware/DbConnect";
import Forgot from "@/models/Forgot";
import nodemailer from "nodemailer";

export async function POST(request, response) {
  try {
    const body = await request.json();
    const token = Math.floor(Math.random() * Date.now());
    const siteName = "aniketronics Fashion Wear";
    const customerServiceEmail = "helpdesk@aniketronics.com";
    const siteTollFreeNumber = "+91-8260374471";
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const resetPasswordUrl = `${siteUrl}/forgot?token=${token}`;
    const forgot = new Forgot({
      email: body.email,
      token: token,
    });
    const email = `We have sent you this email in response to your request to reset your password on ${siteName}. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.
     To reset your password for ${siteUrl}, please follow the link below:${resetPasswordUrl}
     We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your ${siteName} My Account Page and clicking on the "Forgot Password" link.
     If you need help, or you have any other questions, feel free to email
     ${customerServiceEmail}, or call ${siteName} customer service toll-free at 
     ${siteTollFreeNumber}.
     ${siteName} Customer Service`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NEXT_PUBLIC_MY_GMAIL,
        pass: process.env.NEXT_PUBLIC_APP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.NEXT_PUBLIC_MY_GMAIL,
      to: body.email,
      subject: "Reset Password for Aniketronics fashion Wear",
      text: email,
    };
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        return Response.json({
          success: false,
          message: error,
        });
      } else {
        await forgot.save();
        console.log("Email sent: ", info.response);
      }
    });
    return Response.json({
      success: true,
      message:
        "Password Reset Instructions have been sent to your registered Email Id",
    });
  } catch (e) {
    console.error(e);
    return Response.json({
      success: false,
      error: "Internal Server Error due to " + e,
    });
  }
}

const handler = async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const forgot = await Forgot.findOne({ token: token });
    if (forgot) {
      return Response.json({ success: true, email: forgot.email });
    } else {
      return Response.json({ success: false });
    }
  } catch (error) {
    console.error(error);
    return Response.json({ error });
  }
};

export function GET(request, response) {
  return connectDb(handler, request, response);
}

const deleteHandler = async (request, response) => {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const deletedForgot = await Forgot.findOneAndDelete(
      { email },
      {
        new: true,
      }
    );
    if (deletedForgot) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false });
    }
  } catch (error) {
    console.error(error);
  }
};

export function DELETE(request, response) {
  return connectDb(deleteHandler, request, response);
}
