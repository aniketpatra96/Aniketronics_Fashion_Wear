import Forgot from "@/models/Forgot";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request, response) {
  try {
    const body = await request.json();
    const siteName = "aniketronics Fashion Wear";
    const customerServiceEmail = "helpdesk@aniketronics.com";
    const siteTollFreeNumber = "+91-8260374471";
    const siteUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const resetPasswordUrl = `${siteUrl}/forgot?token=${token}`;
    if (body.sendEmail) {
      const token = `gffu674ty`;
      const forgot = new Forgot({
        email: body.email,
        token: token,
      });
      const email = `<div>We have sent you this email in response to your request to reset your password on ${siteName}. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.<br/><br/>
    To reset your password for <a href="${siteUrl}">${siteUrl}</a>, please follow the link below:<a href="${resetPasswordUrl}">Click here to reset your password</a><br/><br/>
    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your ${siteName} My Account Page and clicking on the "Forgot Password" link.<br/><br/>
    If you need help, or you have any other questions, feel free to email
    ${customerServiceEmail}, or call ${siteName} customer service toll-free at 
    ${siteTollFreeNumber}.<br/><br/>
    ${siteName} Customer Service </div>`;
      return Response.json({
        success: true,
        message:
          "Password Reset Instructions have been sent to your registered Email Id",
      });
    } else {
      try {
        const data = await request.json();
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const updatedUser = await User.findOneAndUpdate(
          { email: data.email },
          { password: hashedPassword },
          { new: true }
        );
        return Response.json({
          success: true,
          message: "Password Updated Successfully",
        });
      } catch (error) {
        throw new Error("error while updating password");
      }
    }
  } catch (e) {
    console.error(e);
    return Response.json({
      success: false,
      error: "Internal Server Error due to " + e,
    });
  }
}
