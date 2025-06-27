"use client";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import React, { useState, useEffect } from "react";
import { TbMapPinCode } from "react-icons/tb";
import axios from "axios";
import Image from "next/image";
import productService from "@/services/ProductService";
import Link from "next/link";

const Slug = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const category = searchParams.get("category");
  const { addToCart } = useCart();
  const [pin, setPin] = useState("");
  const [service, setService] = useState(null);
  const [product, setProduct] = useState(null);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productService.fetchProduct(slug, category);
        setProduct(res);
        if (category === "Sticker" || category === "Mug") return;
        const defaultSize = res?.size?.[0] || null;
        setSize(defaultSize);
        const availableColors = (res?.color?.[defaultSize] || []).filter(
          (c) => res?.availableQty?.[defaultSize]?.[c] > 0
        );
        setColor(availableColors[0] || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [slug]);

  const checkServiceability = async () => {
    if (pin.length !== 6) {
      alert("Please enter a valid pincode. Pincode should be 6 digits long.");
      setPin("");
      setService(null);
      return;
    }
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    let pins = await axios.get(`${baseURL}/api/pincode`);
    if (pins.data.includes(parseInt(pin))) {
      setService(true);
    } else {
      setService(false);
    }
  };
  setInterval(() => {
    setPin("");
    setService(null);
  }, 1000 * 60 * 10);
  return (
    product && (
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover lg:object-top sm:object-center rounded"
              src={product.img}
              width={500}
              height={500}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product.category}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {product.title}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: product.desc }}
                className="leading-relaxed"
              ></p>
              {category !== "Sticker" && category !== "Mug" && (
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex flex-wrap sm:flex-nowrap gap-y-2">
                    <span className="mr-3">Color</span>
                    {(size && product.color[size] ? product.color[size] : [])
                      .filter(
                        (c) => (product.availableQty?.[size]?.[c] || 0) > 0
                      )
                      .map((c) => (
                        <button
                          style={{ backgroundColor: c }}
                          key={c}
                          className={`mx-0.5 cursor-pointer border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none ${
                            color === c ? "ring-2 ring-pink-500" : ""
                          }`}
                          onClick={() => setColor(c)}
                        ></button>
                      ))}
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select
                        className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10"
                        onChange={(e) => {
                          setSize(e.target.value);
                          setColor(null);
                        }}
                      >
                        {product.size.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={
                  category !== "Sticker" && category !== "Mug"
                    ? "flex"
                    : "flex mt-5"
                }
              >
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{product.price}
                </span>
                <Link href={"/checkout"}>
                  <button
                    onClick={async () => {
                      let selectedColor = null;
                      let selectedSize = null;
                      if (category === "T-Shirt" || category === "Hoody") {
                        selectedSize = size || product?.size[0] || null;
                        selectedColor =
                          color || product?.color[selectedSize]?.[0] || null;
                      }
                      await addToCart(
                        product._id,
                        slug,
                        1,
                        product.price,
                        product.title,
                        category === "T-Shirt" || category === "Hoody"
                          ? selectedSize
                          : null,
                        category === "T-Shirt" || category === "Hoody"
                          ? selectedColor
                          : null,
                        product.img,
                        product.availableQty,
                        product.category
                      );
                    }}
                    className="flex ml-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                  >
                    Buy Now
                  </button>
                </Link>
                <button
                  onClick={() => {
                    let selectedColor = null;
                    let selectedSize = null;
                    if (category === "T-Shirt" || category === "Hoody") {
                      selectedSize = size || product?.size[0] || null;
                      selectedColor =
                        color || product?.color[selectedSize]?.[0] || null;
                    }
                    addToCart(
                      product._id,
                      slug,
                      1,
                      product.price,
                      product.title,
                      category === "T-Shirt" || category === "Hoody"
                        ? selectedSize
                        : null,
                      category === "T-Shirt" || category === "Hoody"
                        ? selectedColor
                        : null,
                      product.img,
                      product.availableQty,
                      product.category
                    );
                  }}
                  className="flex ml-4 text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Add to Cart
                </button>
                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="pin mt-6 mr-14 flex space-x-2 text-lg">
                <input
                  className="w-full px-2 border-2 border-gray-600 rounded-md"
                  type="text"
                  placeholder="Enter your pincode"
                  onChange={(e) => setPin(e.target.value)}
                  value={pin}
                />
                <button
                  onClick={checkServiceability}
                  className="flex ml-auto text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  <TbMapPinCode className="mt-1 pe-1" />
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className="text-red-700 text-sm mt-3">
                  Sorry! We do not deliver to this pincode yet
                </div>
              )}
              {service && service != null && (
                <div className="text-green-700 text-sm mt-3">
                  Yay! This pincode is serviceable
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default Slug;
