"use client";
import userService from "@/services/UserService";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { FaEye, FaUser, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "@/contexts/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuth();
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if(localStorage.getItem("token")) {
      window.location.href="/";
    }
  }, [])
  if (!mounted) return null;
  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      toast.error("Please fill all the fields !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    const data = { username, password };
    const res = await userService.login(data);
    if (res.status === 200) {
      toast.success(res.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      login(res.token);
      setUsername("");
      setPassword("");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } else if (res.status === 404) {
      toast.error(res.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else if (res.status === 500) {
      toast.error(res.error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };
  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <Link href="/">
            <img
              src="/assets/images/logo2.png"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </Link>
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Sign In
            </h1>
            <form
              className="mt-12 space-y-6"
              onSubmit={handleLogin}
              method="POST"
            >
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  User name
                </label>
                <div className="relative">
                  <input
                    name="username"
                    type="text"
                    value={username}
                    className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="w-4 h-4 absolute right-4 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <FaEye
                      className="w-4 h-4 absolute right-4 cursor-pointer text-gray-400"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-slate-900"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    href="/forgot"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="!mt-12">
                <button
                  type="submit"
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                >
                  Sign in
                </button>
              </div>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
