"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import {
  AiFillCloseCircle,
  AiOutlineShoppingCart,
  AiFillPlusCircle,
  AiFillMinusCircle,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { IoTrashBinSharp } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/UserContext";

const Navbar = () => {
  const { cart, addToCart, removeFromCart, clearCart, subTotal } = useCart();
  const ref = useRef();
  const { isLoggedIn, logout } = useAuth();
  const toggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else if (ref.current.classList.contains("translate-x-0")) {
      ref.current.classList.remove("translate-x-0");
      ref.current.classList.add("translate-x-full");
    }
  };
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();
  const toggleDropdown = () => {
    setDropdown(!dropdown);
  };
  return (
    <div
      className={`flex flex-col md:flex-row md:justify-start justify-center items-center mb-1  shadow-md bg-white-200 top-0 ${
        pathname === "/signup" ? "" : "sticky z-10"
      } bg-white`}
    >
      <div className="logo mr-auto md:mr-0">
        <Link href={"/"}>
          {/* Mobile logo */}
          <Image
            className="h-20 w-30 block md:hidden"
            src={"/assets/images/logo2.png"}
            alt={"main-logo-mobile"}
            height={200}
            width={200}
          />
          {/* Desktop logo */}
          <Image
            className="h-20 w-30 hidden md:block"
            src={"/assets/images/logo.png"}
            alt={"main-logo"}
            height={200}
            width={200}
          />
        </Link>
      </div>
      <div className="nav mx-2">
        <ul className="flex items-center space-x-6 font-extrabold md:text-md">
          <Link href={"/tshirts"}>
            <li>T-shirts</li>
          </Link>
          <Link href={"/hoodies"}>
            <li>Hoodies</li>
          </Link>
          <Link href={"/stickers"}>
            <li>Stickers</li>
          </Link>
          <Link href={"/mugs"}>
            <li>Mugs</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute items-center right-0 top-6 mx-5 cursor-pointer flex">
        {dropdown && (
          <div
            className={`absolute right-0 top-full mt-2 bg-white rounded-md px-5 w-36 z-50 shadow-lg transition-all duration-200 ease-out ${
              dropdown
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
            onMouseEnter={() => window.innerWidth >= 768 && setDropdown(true)}
            onMouseLeave={() => window.innerWidth >= 768 && setDropdown(false)}
          >
            <ul>
              <Link href={"/myaccount"}>
                <li
                  onClick={() => setDropdown(false)}
                  className="py-1 text-sm hover:text-pink-700"
                >
                  My Account
                </li>
              </Link>
              <Link href={"/orders"}>
                <li
                  onClick={() => setDropdown(false)}
                  className="py-1 text-sm hover:text-pink-700"
                >
                  Orders
                </li>
              </Link>
              <li
                onClick={() => {
                  logout();
                  setDropdown(false);
                  window.location.href = "/";
                }}
                className="py-1 text-sm hover:text-pink-700"
              >
                Log Out
              </li>
            </ul>
          </div>
        )}
        {!isLoggedIn ? (
          <Link href={"/login"}>
            <button className="bg-pink-600 px-2 py-1 rounded-md text-xl text-white mx-2 cursor-pointer">
              Login
            </button>
          </Link>
        ) : (
          <MdAccountCircle
            onClick={() => setDropdown((prev) => !prev)}
            className="text-2xl md:text-4xl mx-2"
          />
        )}
        <AiOutlineShoppingCart
          onClick={toggleCart}
          className="text-xl md:text-4xl"
        />
        {Object.keys(cart).length > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {Object.keys(cart)
              .map((k) => cart[k].qty)
              .reduce((a, b) => a + b, 0)}
          </span>
        )}
      </div>
      <div
        ref={ref}
        className="w-auto h-[100vh] sideCart absolute top-0 right-0 bg-pink-100 px-8  py-10 transform transition-transform translate-x-full z-10"
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={toggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="flex items-center justify-center font-normal">
              No items in the cart
            </div>
          )}
          {Object.keys(cart).map((k) => (
            <li key={k}>
              <div className="item flex my-5">
                <div className="w-2/3">{cart[k].name}</div>
                <div className="flex items-center justify-center w-1/3 text-lg">
                  <AiFillMinusCircle
                    onClick={() => removeFromCart(k, 1)}
                    className="text-pink-500 cursor-pointer text-lg"
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
                    className="text-pink-500 cursor-pointer text-lg"
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="font-semibold">
          <span className="mx-2">Sub Total : ₹{subTotal}</span>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Link href={"/checkout"}>
            <button
              onClick={toggleCart}
              disabled={Object.keys(cart).length === 0}
              className="flex mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center"
            >
              <BsFillBagCheckFill className="mt-1 pe-1" /> Checkout
            </button>
          </Link>
          <button
            disabled={Object.keys(cart).length === 0}
            onClick={clearCart}
            className="flex mt-16 ml-2 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg text-center"
          >
            <IoTrashBinSharp className="mt-1.5 pe-1" /> Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
