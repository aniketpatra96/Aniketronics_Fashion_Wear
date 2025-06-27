"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";
import userService from "@/services/UserService";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { FaEye, FaUser, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SignUp = () => {
  const checkRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordConstraints, setPasswordConstraints] = useState({
    minLength: false,
    uppercase: false,
    specialChar: false,
  });
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
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

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordMatch((prev) => {
      if (password === "") return false;
      else return value === password;
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!checkRef.current.checked) {
      toast.error("Please Accept the Terms & Conditions !", {
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
      return;
    }
    if (!Object.values(passwordConstraints).every((value) => value === true)) {
      toast.error("Please fulfill all the Password Constraints !", {
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
      return;
    }
    const data = { username, email, password };
    const res = await userService.signup(data);
    console.log(res);
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
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPasswordTouched(null);
      setPasswordMatch(false);
      setPasswordConstraints({
        minLength: false,
        uppercase: false,
        specialChar: false,
      });
      checkRef.current.checked = false;
    } else if (res.status === 404) {
      if (res.error) {
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
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPasswordTouched(null);
        setPasswordMatch(false);
        setPasswordConstraints({
          minLength: false,
          uppercase: false,
          specialChar: false,
        });
        checkRef.current.checked = false;
      }
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
      checkRef.current.checked = false;
    }
  };

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div className="text-center mb-12">
          <Link href="javascript:void(0)">
            <img
              src="/assets/images/logo2.png"
              alt="logo"
              className="w-40 inline-block"
            />
          </Link>
        </div>
        <h1 className="text-slate-900 text-center text-3xl font-semibold">
          Sign Up
        </h1>
        <form onSubmit={handleSignUp} method="POST">
          <div className="space-y-6">
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Username
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
                Email Id
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  value={email}
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MdEmail className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 pr-10 rounded-md outline-blue-500"
                  placeholder="Enter password"
                  onChange={handlePassword}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  name="cpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  className="text-slate-900 bg-white border border-gray-300 w-full text-sm px-4 py-3 pr-10 rounded-md outline-blue-500"
                  placeholder="Enter confirm password"
                  onChange={handleConfirmPassword}
                  required
                />
                {showConfirmPassword ? (
                  <FaEyeSlash
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 cursor-pointer"
                    onClick={() => setShowConfirmPassword(true)}
                  />
                )}
              </div>
            </div>
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
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                ref={checkRef}
              />
              <label
                htmlFor="remember-me"
                className="text-slate-600 ml-3 block text-sm"
              >
                I accept the{" "}
                <Link
                  href="/accept"
                  className="text-blue-600 font-medium hover:underline ml-1"
                >
                  Terms and Conditions
                </Link>
              </label>
            </div>
          </div>

          <div className="mt-12">
            <button
              type="submit"
              className="w-full py-3 px-4 text-sm tracking-wider font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
            >
              Create an account
            </button>
          </div>
          <p className="text-slate-600 text-sm mt-6 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
