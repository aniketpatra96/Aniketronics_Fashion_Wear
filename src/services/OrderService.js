import axios from "axios";

class OrderService {
  constructor() {
    this.api = process.env.NEXT_PUBLIC_BASE_URL;
  }
  async fetchOrder(orderId) {
    try {
      const response = await axios.get(
        `${this.api}/api/fetchorder?id=${orderId}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async fetchOrders(userId) {
    try {
      const response = await axios.get(
        `${this.api}/api/getorders?userid=${userId}`
      );
      return response.data.orders;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async fetchOrderItem(productId) {
    try {
      const response = await axios.get(
        `${this.api}/api/fetchorderitem?productid=${productId}`
      );
      return response.data.product;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async createOrder(order) {
    try {
      const response = await axios.post(`${this.api}/api/createorder`, order);
      return response.data;
    } catch (error) {
      console.error(error);
      return response.data;
    }
  }
}

const orderService = new OrderService();
export default orderService;
