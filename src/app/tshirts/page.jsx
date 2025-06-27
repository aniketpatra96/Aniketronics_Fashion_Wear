import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import productService from "@/services/ProductService";

const Tshirt = () => {
  const tshirts = use(productService.fetchProducts("T-Shirt"));
  const colorSet = new Set();
  tshirts.forEach((tshirt) => {
    const colorObj = tshirt.color;
    Object.values(colorObj).forEach((arr) => {
      arr.forEach((c) => colorSet.add(c));
    });
  });
  const allColors = Array.from(colorSet);
  return (
    <section className="text-gray-600 body-font">
      <div className="container md:ps-45 mx-auto">
        <div className="flex flex-wrap m-4">
          {tshirts.map((tshirt) => {
            return (
              <div
                key={tshirt.slug}
                className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-2"
              >
                <Link
                  href={`/product?slug=${tshirt.slug}&category=${tshirt.category}`}
                  className="block relative  rounded overflow-hidden"
                >
                  <Image
                    alt="ecommerce"
                    className="m-auto md:m-0 h-[30vh] md:h-[36vh] block"
                    src={tshirt.img}
                    width={420}
                    height={260}
                  />
                </Link>
                <div className="mt-4 text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                    {tshirt.category}
                  </h3>
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {tshirt.title}
                  </h2>
                  <p className="mt-1">₹{tshirt.price}</p>
                  <div className="mt-1 flex flex-wrap">
                    {tshirt.size.map((s) => (
                      <span
                        key={s}
                        className="border border-gray-600 px-1 mx-1 mt-1"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap">
                    {allColors.map((color) => (
                      <button
                        key={color}
                        className={`border-2 border-gray-300 ml-1 rounded-full w-6 h-6 focus:outline-none`}
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tshirt;
