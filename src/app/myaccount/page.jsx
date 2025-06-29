"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/UserContext";
import accountService from "@/services/AccountService";
import userService from "@/services/UserService";
import Image from "next/image";
import { useEdgeStore } from "@/lib/edgestore";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { MdOutlineManageAccounts } from "react-icons/md";

const MyAccount = () => {
  const [account, setAccount] = useState({});
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const { user, setUser } = useAuth();
  const [profilePicFile, setProfilePicFile] = useState();
  const { edgestore } = useEdgeStore();
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  useEffect(() => {
    if (!user?._id) return;
    const fetchAccount = async () => {
      try {
        const response = await accountService.getAccount(user._id);
        if (response.status === 200) {
          setAccount(response.account);
        }
      } catch (err) {
        console.error("Failed to fetch account", err);
      }
    };
    const fetchUser = async () => {
      try {
        const response = await userService.getUser(user._id);
        if (response.status === 200) {
          setUser(response.user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    Promise.all([fetchAccount(), fetchUser()]).finally(() => {
      setLoading(false);
    });
  }, [user?._id]);

  const handleUpdateProfilePicture = async (e) => {
    e.preventDefault();
    if (profilePicFile) {
      const res = await edgestore.publicFiles.upload({
        file: profilePicFile,
        onProgressChange: (progress) => {
          if (progress === 100) {
            toast.success("Profile Picture Updated Successfully", {
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
        },
      });
      const data = { userId: user._id, url: res.url };
      const response = await userService.updateUser(data);
      if (response.status === 200 && response.updatedUser) {
        await setUser(response.updatedUser);
        setProfileModalOpen(false);
        setProfilePicFile(null);
      } else if (response.status === 500) {
        console.log(response.error);
      } else if (response.status === 404) {
        response.error &&
          toast.error(response.error || "Failed to update profile picture", {
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
      toast.error("Please select a profile picture", {
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

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const userData = {
        userId: user._id,
        username: user.username,
        password: password,
      };
      const accountData = {
        accountId: account._id,
        name: account.name,
        phone: account.phone,
        deliveryAddress: account.deliveryAddress,
        homeAddress: account.homeAddress,
      };
      const response1 = await userService.updateUser(userData);
      const response2 = await accountService.updateAccount(accountData);
      if (response1.status === 200 && response2.status === 200) {
        toast.success("Profile Updated Successfully!", {
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
      } else if (response1.error && response2.error) {
        response1.error
          ? toast.error(response1.error, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            })
          : response2.error &&
            toast.error(response2.error, {
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
      } else if (response1.error) {
        response1.error &&
          toast.error(response1.error, {
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
      } else if (response2.error) {
        response2.error &&
          toast.error(response2.error, {
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
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return null;
  if (!user) {
    return <p>Loading user info...</p>;
  }
  if(!account) {
    return <p>Loading account info...</p>;
  }
  return (
    user && (
      <section className="relative pt-40 pb-24">
        <img
          src="https://www.pixelstalk.net/wp-content/uploads/images2/Scenery-Wallpaper-HD-Widescreen.jpg"
          alt="cover-image"
          className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
        />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center sm:justify-start relative mb-5">
            <div className="relative">
              <div
                onClick={() => setProfileModalOpen(true)}
                className="cursor-pointer"
              >
                <Image
                  src={
                    user?.profilePicture ||
                    "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                  }
                  alt="user-avatar-image"
                  className="border-4 border-solid border-white rounded-full object-cover"
                  width={200}
                  height={200}
                />
              </div>
              {/* profile pic modal */}
              <div
                id="authentication-modal"
                tabIndex="-1"
                aria-hidden="true"
                className={`${
                  profileModalOpen ? "block" : "hidden"
                } absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-50 w-72 sm:w-80`}
              >
                <div className="relative w-full max-w-sm mx-auto p-4 sm:p-6 max-h-full overflow-y-auto">
                  <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Update Profile Picture
                      </h3>
                      <button
                        type="button"
                        onClick={() => setProfileModalOpen(false)}
                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className="p-4 md:p-5">
                      <form className="space-y-4" action="#">
                        <div>
                          <label
                            htmlFor="profile"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your Profile Picture
                          </label>
                          <input
                            type="file"
                            onChange={(e) => {
                              setProfilePicFile(e.target.files?.[0]);
                            }}
                            name="profile"
                            id="profile"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="upload your profile pic"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                          onClick={handleUpdateProfilePicture}
                        >
                          Update Profile Picture
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/** account update modal */}
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={`${
              accountModalOpen ? "block" : "hidden"
            } absolute top-0 mt-0 left-1/2 transform -translate-x-1/2 z-50 w-100 sm:w-100`}
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Update Account
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                    onClick={() => setAccountModalOpen(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form onSubmit={handleUpdate} className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Your Name"
                        value={account.name}
                        onChange={(e) =>
                          setAccount({
                            ...account,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Your username"
                        value={user.username}
                        onChange={(e) =>
                          setUser({
                            ...user,
                            username: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Your username"
                        value={account.phone}
                        onChange={(e) =>
                          setAccount({
                            ...account,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="homeaddress"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Home Address
                      </label>
                      <textarea
                        id="homeaddress"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        placeholder="your home address"
                        value={account.homeAddress}
                        onChange={(e) =>
                          setAccount({
                            ...account,
                            homeAddress: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="delivery"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Delivery Address
                      </label>
                      <textarea
                        id="delivery"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
                        placeholder="Delivery address"
                        value={account.deliveryAddress}
                        onChange={(e) =>
                          setAccount({
                            ...account,
                            deliveryAddress: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white inline-flex justify-center items-center bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800 w-full"
                  >
                    <MdOutlineManageAccounts className="me-1 -ms-1 w-5 h-5" />
                    Update Account
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1 max-sm:text-center">
                {account.name}
              </h3>
              <p className="font-normal text-base leading-7 text-gray-500  max-sm:text-center">
                {user.email} <br className="hidden sm:block" />
                {account.homeAddress}
              </p>
            </div>
            <button
              data-modal-target="crud-modal"
              data-modal-toggle="crud-modal"
              className="py-3.5 px-5 flex rounded-full bg-pink-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-pink-700"
              onClick={() => setAccountModalOpen(true)}
            >
              <span className="px-2 font-semibold text-base leading-7 text-white">
                Edit Account
              </span>
            </button>
          </div>
          <div className="flex max-sm:flex-wrap max-sm:justify-center items-center gap-4">
            <a
              href="javascript:;"
              className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              Ux Research
            </a>
            <a
              href="javascript:;"
              className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              CX Strategy
            </a>
            <a
              href="javascript:;"
              className="rounded-full py-3 px-6 bg-stone-100 text-gray-700 font-semibold text-sm leading-6 transition-all duration-500 hover:bg-stone-200 hover:text-gray-900"
            >
              Project Manager
            </a>
          </div>
        </div>
        <ToastContainer />
      </section>
    )
  );
};

export default MyAccount;
