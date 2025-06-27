import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import productService from "@/services/ProductService";

const Sticker = () => {
  const stickers = use(productService.fetchProducts("Sticker"));
  return (
    <section className="text-gray-600 body-font">
      <div className="container md:ps-45 mx-auto">
        <div className="flex flex-wrap m-4">
          {stickers.map((sticker) => {
            return (
              <div
                key={sticker.slug}
                className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-2"
              >
                <Link
                  href={`/product?slug=${sticker.slug}&category=${sticker.category}`}
                  className="block relative  rounded overflow-hidden"
                >
                  <Image
                    alt="ecommerce"
                    className="m-auto md:m-0 h-[30vh] md:h-[36vh] block"
                    src={sticker.img}
                    width={420}
                    height={260}
                  />
                </Link>
                <div className="mt-4 text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {sticker.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {sticker.title}
                  </h2>
                  <p className="mt-1">₹{sticker.price}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sticker;
