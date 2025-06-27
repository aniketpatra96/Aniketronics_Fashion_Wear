"use client";
import React, { useState, useEffect } from "react";
import orderService from "@/services/OrderService";
import { useAuth } from "@/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    if (user && user._id) {
      const fetchOrders = async () => {
        try {
          const response = await orderService.fetchOrders(user._id);
          setOrders(response);
        } catch (err) {
          console.error("Failed to fetch orders", err);
        }
      };

      fetchOrders();
    }
  }, [user]);
  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center mt-5">
        No Orders Placed yet...
      </div>
    );
  }
  return (
    orders && (
      <div>
        <div className="container mx-auto mt-2">
          <h1 className="font-bold text-3xl">My Orders</h1>
          {orders.map((order, index) => (
            <div key={order._id} className="mt-5">
              <h1 className="font-semibold text-xl">
                {index + 1}. Order Id : {order._id}
              </h1>
              <h1 className="font-semibold text-xl mx-5 mt-1">
                Order Date:{" "}
                {new Date(order.orderDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </h1>
              <h1 className="font-semibold text-xl mx-5 mt-1">
                Order Total: ₹{order.orderTotal}
              </h1>
              <h1 className="font-semibold text-sm mx-5 mt-1 text-blue-700">
                <Link href={`/orderdetails/${order._id}`}>Order Details...</Link>
              </h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Product name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Color
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Size
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Track Order
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((product) => (
                      <tr
                        key={product._id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 break-words max-w-0 dark:text-white"
                        >
                          {product.title}
                        </th>
                        <td className="px-6 py-4">
                          <Image
                            src={product.img}
                            width={100}
                            height={100}
                            alt="img"
                          />
                        </td>
                        <td className="px-6 py-4">{product.color}</td>
                        <td className="px-6 py-4">{product.size}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">₹{product.price}</td>
                        <td className="px-6 py-4">{product.quantity}</td>
                        <td className="px-6 py-4">
                          <Link
                            href={`/order?productid=${product.productId}`}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Track
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Orders;
