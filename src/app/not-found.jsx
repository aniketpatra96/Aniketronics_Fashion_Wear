import Link from 'next/link';
import React from 'react'

const NotFound = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col justify-center items-center relative">
      <p className="absolute top-12 text-[7rem] text-black/40">404</p>

      <img
        src="/assets/gif/404.gif"
        alt="404 GIF"
        className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl my-4"
      />

      <h2 className="absolute bottom-32 text-[35px]">Page Not Found</h2>

      <h5 className="absolute bottom-24 text-gray-400">
        Sorry, we couldn't find the page you were looking for.
      </h5>

      <Link
        href="/"
        className="absolute bottom-4 bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-3 text-white no-underline text-[25px] rounded-xl"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound