import React, { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { HiOutlineViewGrid } from "react-icons/hi";
import { TbCoinTaka } from "react-icons/tb";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);

    console.log("orders", orders);

    useEffect(() => {
        fetch("http://localhost:3000/allOrders")
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Error fetching orders:", error));
    }, []);
    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <HiOutlineViewGrid className="text-info" />
                    All Orders
                </h2>
                <input
                    className="input"
                    type="text"
                    placeholder="Search order by title, location, status"
                />
            </div>
            <div>
                <div>
                    {orders?.map((order, index) => (
                        <div className="overflow-x-auto my-2 md:my-4 border rounded border-info">
                            <div className="bg-info text-white rounded-t p-1 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2 px-4">
                                <h1 className="font-bold">{order?.name}</h1>
                                <h1 className="text-lg font-semibold flex flex-col md:flex-row items-center gap-2">
                                    {index + 1}. Order ID: #{order?._id}
                                    <TbCoinTaka /> {order?.totalPrice} BDT
                                </h1>
                                <button className="btn btn-sm btn-info btn-soft">
                                    View Details
                                </button>
                            </div>
                            <table className="rounded-b min-w-full bg-white shadow-md overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr className="text-left text-sm font-semibold text-gray-600">
                                        <th className="px-6 py-3">Image</th>
                                        <th className="px-6 py-3">Title</th>
                                        <th className="px-6 py-3">
                                            Order Time
                                        </th>
                                        <th className="px-6 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order?.orderedProducts?.map((product) => (
                                        <tr className="border-t border-gray-200">
                                            <td className="px-6 py-4">
                                                <img
                                                    src={product?.images}
                                                    alt={""}
                                                    className="w-14 h-14 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-6 py-4 font-medium">
                                                {product?.title}
                                                <p className="flex items-center gap-2 text-[#b98e2f]">
                                                    <FaBangladeshiTakaSign />
                                                    {product?.price} BDT
                                                </p>
                                            </td>
                                            <td className="px-6 py-4">
                                                {order?.orderDate}
                                            </td>
                                            <td
                                                className={`px-6 py-4 ${
                                                    order?.status === "pending"
                                                        ? "text-yellow-500"
                                                        : order?.status ===
                                                          "completed"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
                                                {order?.status}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllOrders;
