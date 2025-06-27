"use client";
import { createContext } from "react";
import { useEffect, useState, useContext } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
        setSubTotal(
          localStorage.getItem("subtotal")
            ? JSON.parse(localStorage.getItem("subtotal"))
            : 0
        );
      }
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      localStorage.clear();
      setCart({});
    }
  }, []);

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    localStorage.setItem("subtotal", subt);
    setSubTotal(subt);
  };

  const addToCart = (
    productId,
    itemCode,
    qty,
    price,
    name,
    size,
    color,
    img,
    availableQty,
    category
  ) => {
    let newCart = { ...cart };

    let stock;
    const hasVariants = typeof availableQty === "object" && size && color;
    if (hasVariants) {
      stock = availableQty?.[size]?.[color] || 0;
    } else {
      stock = typeof availableQty === "number" ? availableQty : 0;
    }

    if (itemCode in cart) {
      const currentQty = cart[itemCode].qty;
      if (currentQty + qty > stock) {
        toast.error(
          `Only ${stock} ${stock === 1 ? "item" : "items"} available !!`,
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          }
        );
        return;
      }
      newCart[itemCode].qty = currentQty + qty;
    } else {
      if (qty > stock) {
        toast.error(
          `Only ${stock} ${stock === 1 ? "item" : "items"} available !!`,
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          }
        );
        return;
      }
      newCart[itemCode] = {
        productId,
        qty,
        price,
        name,
        size,
        color,
        category,
        img,
        availableQty,
      };
    }

    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemCode, qty) => {
    let newCart = { ...cart };
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
    console.log("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        subTotal,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {
        <>
          {children}
          <ToastContainer />
        </>
      }
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};
