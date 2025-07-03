"use client";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Video from "@/components/Video";

const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

const Secret = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === secretKey) {
      setError(false);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            setAuthenticated(true);
            setInput("");
            return 5;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    } else {
      setInput("");
      setError(true);
      setAuthenticated(false);
      setCountdown(5);
    }
  };

  return (
    <div>
      {!authenticated ? (
        <>
          <form onSubmit={handleSubmit} className="text-center mt-10">
            <input
              type="password"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter secret key"
              className="border border-gray-300 rounded-lg p-2 text-xl"
            />
            <div className="flex justify-center mt-4 mr-2">
              <button
                type="submit"
                className="ml-2 text-xl text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded-lg"
              >
                Submit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setAuthenticated(false);
                  setInput("");
                  window.location.href = "/";
                }}
                className="ml-2 text-xl text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded-lg"
              >
                Back
              </button>
            </div>
          </form>
          {error !== null && (
            <p>
              {error ? (
                <span className="flex items-center justify-center mt-5 text-red-500">
                  Secret key is incorrect. Please Try Again ...
                </span>
              ) : (
                <span className="flex items-center justify-center mt-5 text-green-500">
                  Your Secret Key is Correct. Redirecting to secret page in{" "}
                  {countdown} seconds...
                </span>
              )}
            </p>
          )}
        </>
      ) : (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAuthenticated(false);
              setInput("");
              window.location.href = "/";
            }}
            className="ml-2 mt-2 text-xl text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded-lg"
          >
            Back
          </button>
          <Carousel
            showThumbs={false}
            showStatus={false}
            autoPlay={false}
            infiniteLoop
            useKeyboardArrows
            emulateTouch
          >
            <div>
              <Video
                className="love"
                src="/assets/videos/love_hai_mushkil.mp4"
                width={1280}
                height={720}
                autoPlay={false}
                loop={false}
                preload="auto"
              />
            </div>
            <div>
              <Video
                className="love"
                src="/assets/videos/love_hai_mushkil_2.mp4"
                width={1280}
                height={720}
                autoPlay={false}
                loop={false}
                preload="auto"
              />
            </div>
            <div>
              <Video
                className="love"
                src="/assets/videos/love_hai_mushkil_3.mp4"
                width={1280}
                height={720}
                autoPlay={false}
                loop={false}
                preload="auto"
              />
            </div>
            <div>
              <Video
                className="love"
                src="/assets/videos/love_hai_mushkil_4.mp4"
                width={1280}
                height={720}
                autoPlay={false}
                loop={false}
                preload="auto"
              />
            </div>
          </Carousel>
        </>
      )}
    </div>
  );
};

export default Secret;
