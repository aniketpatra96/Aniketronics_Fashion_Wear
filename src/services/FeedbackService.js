import axios from "axios";

class FeedbackService {
  constructor() {
    this.api = process.env.NEXT_PUBLIC_BASE_URL;
  }
  async addFeedback(data) {
    let response = null;
    try {
      response = await axios.post(`${this.api}/api/feedback`, data);
      if (response?.data?.error) {
        return {
          status: 404,
          error: response?.data?.error,
        };
      }
      return {
        status: 200,
        message: response?.data?.message,
      };
    } catch (e) {
      console.error(e);
      return {
        status: 500,
        error: response?.data?.error || "Internal Server Error due to " + e,
      };
    }
  }
}

const feedbackService = new FeedbackService();
export default feedbackService;
