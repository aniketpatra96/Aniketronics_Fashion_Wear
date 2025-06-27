"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import orderService from "@/services/OrderService";
import Link from "next/link";

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const { orderId } = useParams();
  useEffect(() => {
    const fetchOrder = async () => {
      const order = await orderService.fetchOrder(orderId);
      setOrder(order);
    };
    fetchOrder();
  }, [orderId]);
  return (
    order && (
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-2xl text-3xl mb-4 font-medium text-gray-900">
              Ordered By : Mr/Ms {order.name}
              <br className="hidden lg:inline-block" />
              Delivery Address : {order.address}
              <br className="hidden lg:inline-block" />
              Contact Number : {order.phone}
              <br className="hidden lg:inline-block" />
              Email : {order.email}
            </h1>
            <div className="flex justify-center">
              <Link href="/orders">
                <button className="inline-flex text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded text-lg">
                  Back to Orders
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default OrderDetails;
