import axios from "axios";

class ForgotService {
  constructor() {
    this.api = process.env.NEXT_PUBLIC_BASE_URL;
  }
  async sendResetEmail(data) {
    let response;
    try {
      const response = await axios.post(`${this.api}/forgot`, data);
      if (response.status === 200 && response?.data?.success) {
        return { status: 200, message: response?.data?.message };
      }
      return { status: 404, error: response?.data?.error };
    } catch (error) {
      console.error(error);
      return { status: 500, error: response?.data?.error || error };
    }
  }
}

const forgotService = new ForgotService();
export default forgotService;
