import axios from "axios";

class UserService {
  constructor() {
    this.api = process.env.NEXT_PUBLIC_BASE_URL;
  }
  async signup(data) {
    let response = null;
    try {
      response = await axios.post(`${this.api}/api/signup`, data);
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
  async login(data) {
    let response = null;
    try {
      response = await axios.post(`${this.api}/api/login`, data);
      if (response?.data?.error) {
        return {
          status: 404,
          error: response?.data?.error,
        };
      }
      return {
        status: 200,
        message: response?.data?.message,
        token: response?.data?.token,
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

const userService = new UserService();
export default userService;
