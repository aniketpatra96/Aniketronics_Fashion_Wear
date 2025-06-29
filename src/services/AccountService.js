import axios from "axios";

class AccountService {
  constructor() {
    this.api = process.env.NEXT_PUBLIC_BASE_URL;
  }
  async getAccount(userId) {
    let response = null;
    try {
      response = await axios.get(`${this.api}/api/account?userid=${userId}`);
      if (response?.data?.error) {
        return {
          status: 404,
          error: response?.data?.error,
        };
      }
      return {
        status: 200,
        account: response?.data?.account,
      };
    } catch (e) {
      console.error(e);
      return {
        status: 500,
        error: response?.data?.error || "Internal Server Error due to " + e,
      };
    }
  }
  async updateAccount(account) {
    let response = null;
    try {
      response = await axios.put(`${this.api}/api/account`, account);
      if (response?.data?.error) {
        return {
          status: 404,
          error: response?.data?.error,
        };
      }
      return {
        status: 200,
        updatedUser: response?.data?.updatedAccount,
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

const accountService = new AccountService();
export default accountService;
