import axios from "axios";

class ProductService {
  constructor() {
    this.api = process.env.NEXT_PUBLIC_BASE_URL;
  }
  async fetchProducts(category) {
    try {
      const response = await axios.get(
        `${this.api}/api/getproducts?category=${category}`
      );
      if (category === "T-Shirt") return response.data.tshirts;
      else if (category === "Hoody") return response.data.hoodies;
      else if (category === "Sticker") return response.data.stickers;
      else if(category === "Mug") return response.data.mugs;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async fetchProduct(slug, category) {
    try {
      const response = await axios.get(
        `${this.api}/api/getproduct?slug=${encodeURIComponent(
          slug
        )}&category=${encodeURIComponent(category)}`
      );
      if (category === "T-Shirt") return response.data.tshirt;
      else if (category === "Hoody") return response.data.hoody;
      else if (category === "Sticker") return response.data.sticker;
      else if(category === "Mug") return response.data.mug;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  async updateStock(category,data) {
    try {
      const response = await axios.put(`${this.api}/api/updatestock?category=${category}`,data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

const productService = new ProductService();
export default productService;
