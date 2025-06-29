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
  async getUser(userId) {
    let response;
    try {
      response = await axios.get(`${this.api}/api/user?userid=${userId}`);
      return {
        status: 200,
        user: response?.data?.user,
      };
    } catch (error) {
      return { status: 500, error: response?.data?.error };
    }
  }
  async updateUser(data) {
    let response;
    try {
      response = await axios.put(`${this.api}/api/user`, data);
      if (response.data.error)
        return { status: 404, error: response.data.error };
      return {
        status: 200,
        updatedUser: response?.data?.updatedUser,
      };
    } catch (error) {
      return { status: 500, error: response?.data?.error };
    }
  }
  async validateUser(data) {
    let response;
    try {
      response = await axios.post(`${this.api}/api/validateuser`, data);
      if (response.data.success)
        return { status: 200, message: response?.data?.message };
      else
        return {
          status: 404,
          message: response?.data?.message,
        };
    } catch (error) {
      console.error(error);
      return { status: 500, error: response?.data?.error };
    }
  }
}

const userService = new UserService();
export default userService;
