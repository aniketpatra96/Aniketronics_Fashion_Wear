"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { toast, Bounce } from "react-toastify";
import userService from "@/services/UserService";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";
import forgotService from "@/services/ForgotService";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(null);
  const [passwordConstraints, setPasswordConstraints] = useState({
    minLength: false,
    uppercase: false,
    specialChar: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch((prev) => {
      if (password === "") return false;
      else return value === password;
    });
  };
  const handlePassword = (e) => {
    const value = e.target.value;
    setPasswordTouched(true);
    const updatedConstraints = {
      minLength: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      specialChar: /[@#$%^&!]/.test(value),
    };
    setPasswordConstraints(updatedConstraints);
    setPassword(value);
    setPasswordMatch(confirmPassword === value);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      window.location.href = "/";
      return;
    }
    if (token) {
      (async () => {
        try {
          const response = await forgotService.validateToken(token);
          if (response.status === 200 && response.success) {
            toast.success("Token Validated Successfully !!", {
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
            setEmail(response.email || "");
          } else {
            window.location.href = "/forgot";
          }
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [token]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await userService.validateUser({ email });
    if (response.status === 200) {
      const data = { email };
      const res = await forgotService.sendResetEmail(data);
      if (res.status === 200) {        
        await res.message &&
          toast.success(res?.message || "success", {
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
        setEmail("");
      }
    } else if (response.status === 404) {
      response?.message &&
        toast.error(response?.message || "failure", {
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
    } else {
      response?.error &&
        toast.error(response?.error || "error", {
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
  const handleReset = async (e) => {
    e.preventDefault();
    try {
      if (
        password === confirmPassword &&
        Object.values(passwordConstraints).every((value) => value === true)
      ) {
        const data = { email, password };
        const response1 = await forgotService.resetPassword(data);
        if (response1.status === 200) {
          const response2 = await forgotService.deleteToken(email);
          if (response2.status === 200 && response2.success) {
            toast.success("Password has been Reset Successfully !", {
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
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => (window.location.href = "/login"), 5000);
          }
        } else {
          toast.error("Unable to reset your Password !", {
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
      } else {
        toast.error("Fulfill all Password Credentials !", {
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
        setPasswordTouched(true);
        setPasswordConstraints({
          minLength: password.length >= 8,
          uppercase: /[A-Z]/.test(password),
          specialChar: /[@#$%^&!]/.test(password),
        });
        setPasswordMatch(confirmPassword === password);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <Link href="/">
            <img
              src="/assets/images/logo2.png"
              alt="logo"
              className="w-40 mb-8 mx-auto block"
            />
          </Link>
          {token ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">
                Reset Password
              </h1>
              <form onSubmit={handleReset} className="mt-12 space-y-6">
                <div>
                  <label
                    htmlFor="password"
                    className="text-slate-900 text-sm font-medium mb-2 block"
                  >
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
                      onChange={handlePassword}
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
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="text-slate-900 text-sm font-medium mb-2 block"
                  >
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      placeholder="Enter password"
                      value={confirmPassword}
                      onChange={handleConfirmPassword}
                    />
                    {showConfirmPassword ? (
                      <FaEyeSlash
                        className="w-4 h-4 absolute right-4 cursor-pointer text-gray-400"
                        onClick={() => setShowConfirmPassword(false)}
                      />
                    ) : (
                      <FaEye
                        className="w-4 h-4 absolute right-4 cursor-pointer text-gray-400"
                        onClick={() => setShowConfirmPassword(true)}
                      />
                    )}
                  </div>
                </div>
                <div className="!mt-12">
                  <button
                    disabled={password !== confirmPassword}
                    type="submit"
                    className="disabled:bg-pink-400 w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none cursor-pointer"
                  >
                    Reset
                  </button>
                </div>
              </form>
              <h6>Password Constraints</h6>
              <div className="flex items-center">
                <ul className="list-none">
                  <li
                    className={`flex items-center gap-2 ${
                      passwordTouched === null
                        ? ""
                        : passwordConstraints.minLength
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Password must be at least 8 characters
                    {passwordTouched !== null &&
                      (passwordConstraints.minLength ? (
                        <SiTicktick />
                      ) : (
                        <RxCross1 />
                      ))}
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordTouched === null
                        ? ""
                        : passwordConstraints.uppercase
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Password must contain 1 Uppercase letter
                    {passwordTouched !== null &&
                      (passwordConstraints.uppercase ? (
                        <SiTicktick />
                      ) : (
                        <RxCross1 />
                      ))}
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordTouched === null
                        ? ""
                        : passwordConstraints.specialChar
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Password must contain 1 Special character
                    {passwordTouched !== null &&
                      (passwordConstraints.specialChar ? (
                        <SiTicktick />
                      ) : (
                        <RxCross1 />
                      ))}
                  </li>
                  <li
                    className={`flex items-center gap-2 ${
                      passwordTouched === null
                        ? ""
                        : passwordMatch
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    Password and confirm password must match
                    {passwordTouched !== null &&
                      (passwordMatch ? <SiTicktick /> : <RxCross1 />)}
                  </li>
                  <li>Note:- Special characters allowed are @#$%^&!</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">
                Forgot Password
              </h1>
              <form onSubmit={handleSubmit} className="mt-12 space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="text-slate-900 text-sm font-medium mb-2 block"
                  >
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 pr-8 rounded-md outline-blue-600"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="w-4 h-4 absolute right-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="10"
                        cy="7"
                        r="6"
                        data-original="#000000"
                      ></circle>
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="!mt-12">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none cursor-pointer"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
