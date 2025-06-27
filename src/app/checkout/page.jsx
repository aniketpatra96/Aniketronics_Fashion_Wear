"use client";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useCart } from "@/contexts/CartContext";
import { MdShoppingCartCheckout } from "react-icons/md";
import Image from "next/image";
import { useAuth } from "@/contexts/UserContext";
import { toast, Bounce } from "react-toastify";

const Checkout = () => {
  const { cart, addToCart, removeFromCart, subTotal } = useCart();
  const [state, setState] = useState(null);
  const [cities, setCities] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [validPincode, setValidPincode] = useState(false);
  const checkServiceability = async (pin) => {
    if (pin.length !== 6) {
      if (typeof toast.error === "function") {
        setTimeout(() => {
          toast.error(
            "Please enter a valid pincode. Pincode should be 6 digits long !",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            }
          );
        }, 0);
      }
      return false;
    }
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    let pins = await axios.get(`${baseURL}/api/pincode`);
    if (pins.data.includes(parseInt(pin))) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (state === "") {
      setCities(null);
      return;
    }
    if (state !== null && state !== "") {
      (async () => {
        try {
          const res = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/state/cities",
            {
              country: "India",
              state: state,
            }
          );
          if (res.status === 200) {
            setCities(res.data.data);
          }
        } catch (err) {
          alert("Error fetching cities");
          setCities(null);
        }
      })();
    }
  }, [state]);
  const { isLoggedIn } = useAuth();
  const handleCheckout = async () => {
    const val = await checkServiceability(pincode);
    setValidPincode(val);
    if (!isLoggedIn) {
      if (typeof toast.error === "function") {
        setTimeout(() => {
          toast.error("Please Login to checkout!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          });
        }, 0);
      }
      return;
    } else {
      if (
        name === "" ||
        email === "" ||
        city === "" ||
        phone === "" ||
        address === "" ||
        pincode === ""
      ) {
        if (typeof toast.error === "function") {
          setTimeout(() => {
            toast.error("Please fill all the fields!", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          }, 0);
        }
        return;
      }else if(!validPincode) {
        if (typeof toast.error === "function") {
          setTimeout(() => {
            toast.error("Pincode is not Serviceable !", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          }, 0);
        }
        return;
      }
      const order = {
        name,
        email,
        city,
        state,
        phone,
        address,
        pincode,
        cart,
        subTotal,
      };
      localStorage.setItem("order", JSON.stringify(order));
    }
  };
  return (
    <div className="container px-2 sm:m-auto">
      <h1 className="font-bold text-3xl text-center my-8">Checkout</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Your Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Your Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            placeholder="Your Address"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              Select your City:
            </label>
            <select
              name="city"
              id="city"
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
            >
              <option value="">--Select City--</option>
              {cities !== null &&
                cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              Select your State:
            </label>
            <select
              name="state"
              id="state"
              onChange={(e) => setState(e.target.value)}
              className="w-full rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
            >
              <option value="">--Select State--</option>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Andaman and Nicobar Islands">
                Andaman and Nicobar Islands
              </option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Dadra and Nagar Haveli and Daman and Diu">
                Dadra and Nagar Haveli and Daman and Diu
              </option>
              <option value="Delhi">Delhi</option>
              <option value="Jammu and Kashmir">Jammu and Kashmir</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Lakshadweep">Lakshadweep</option>
              <option value="Puducherry">Puducherry</option>
            </select>
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="pin" className="leading-7 text-sm text-gray-600">
              Pin Code
            </label>
            <input
              type="text"
              id="pin"
              name="pin"
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              placeholder="Your Zip/Pin Code"
              onChange={(e) => setPincode(e.target.value)}
              value={pincode}
            />
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-xl">2. Review Cart Items</h2>
      <div className="sideCart px-8">
        {Object.keys(cart).length === 0 && (
          <div className="flex items-center justify-center font-normal">
            No items in the cart
          </div>
        )}
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-5">
                <div className="m-auto">
                  <span>{cart[k].name}</span>
                  <br />
                  <span>Size : {cart[k].size}</span>
                  <br />
                  <span>Color : {cart[k].color}</span>
                  <br />
                  <span>Price : ₹ {cart[k].price}</span>
                </div>
                <div className="m-auto">
                  <Image
                    src={cart[k].img}
                    alt="item"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex items-center justify-center w-1/3 text-2xl">
                  <AiFillMinusCircle
                    onClick={() => removeFromCart(k, 1)}
                    className="text-pink-500 cursor-pointer"
                  />
                  <span className="mx-2">{cart[k].qty}</span>
                  <AiFillPlusCircle
                    onClick={() =>
                      addToCart(
                        cart[k].productId,
                        k,
                        1,
                        cart[k].price,
                        cart[k].name,
                        cart[k].size,
                        cart[k].color,
                        cart[k].img,
                        cart[k].availableQty
                      )
                    }
                    className="text-pink-500 cursor-pointer"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <span>
          <span className="font-semibold">Sub Total :</span>
          <span className="mx-2">₹ {subTotal}</span>
        </span>
        <div className="flex items-center justify-center">
          <Link href={validPincode ? "/payment" :"#"}>
            <button
              disabled={Object.keys(cart).length === 0}
              className="flex mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center"
              onClick={handleCheckout}
            >
              <MdShoppingCartCheckout className="mt-1 pe-1 text-xl" /> Pay Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
