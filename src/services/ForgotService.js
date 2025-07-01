import axios from "axios";

class ForgotService {
  constructor() {
    this.api = process.env.NEXT_PUBLIC_BASE_URL;
  }
  async sendResetEmail(data) {
    let response;
    try {
      response = await axios.post(`${this.api}/api/forgot`, data);
      if (response.status === 200) {
        return { status: 200, message: response?.data?.message };
      }
      return { status: 404, message: response?.data?.message };
    } catch (error) {
      console.error(error);
      return { status: 500, error: response?.data?.error || error };
    }
  }
  async validateToken(token) {
    let response;
    try {
      response = await axios.get(`${this.api}/api/forgot?token=${token}`);
      if (response.status === 200) {
        return {
          status: 200,
          success: response?.data?.success,
          email: response.data.email,
          createdAt: response.data.createdAt,
        };
      } else {
        return { status: 404, success: response?.data?.success };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, error: error };
    }
  }
  async resetPassword(data) {
    let response;
    try {
      response = await axios.put(`${this.api}/api/resetpassword`, data);
      if (response.data.success) {
        return { status: 200, message: response?.data?.message };
      } else {
        return {
          status: 404,
          message: response?.data?.message || response?.data?.error,
        };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, error: error };
    }
  }
  async deleteToken(email) {
    let response;
    try {
      response = await axios.delete(`${this.api}/api/forgot?email=${email}`);
      if (response.status === 200) {
        return { status: 200, success: response?.data?.success };
      } else {
        return { status: 404, success: response?.data?.success };
      }
    } catch (error) {
      console.error(error);
      return { status: 500, error: error };
    }
  }
}

const forgotService = new ForgotService();
export default forgotService;
