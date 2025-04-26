import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const orders = [
    {
        id: 1,
        image: "https://i.ibb.co.com/qFWn8JfB/furniture-styles-Getty-Images-1467984982-512fed4077b646eabbc187619554d517.jpg",
        title: "Modern Wooden Chair",
        district: "Dhaka",
        status: "pending",
    },
    {
        id: 2,
        image: "https://i.ibb.co.com/vCsPjzkX/images.jpg",
        title: "Elegant Sofa Set",
        district: "Chittagong",
        status: "completed",
    },
    {
        id: 3,
        image: "https://i.ibb.co.com/Xr5MCRyN/hero1.jpg",
        title: "Glass Coffee Table",
        district: "Comilla",
        status: "cancelled",
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case "pending":
            return "bg-yellow-50 text-yellow-800";
        case "completed":
            return "bg-green-50 text-green-800";
        case "cancelled":
            return "bg-red-50 text-red-800";
        default:
            return "";
    }
};

const AllOrders = () => {
    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-6">All Orders</h2>
                <input
                    className="input"
                    type="text"
                    placeholder="Search order by title, location, status"
                />
            </div>
            <div className="overflow-x-auto border border-gray-200">
                <table className="min-w-full bg-white shadow-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-t border-gray-200"
                            >
                                <td className="px-6 py-4">
                                    <img
                                        src={order.image}
                                        alt={order.title}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {order.title}
                                    <p className="flex items-center gap-2 text-[#b98e2f]">
                                        <FaBangladeshiTakaSign />
                                        2500 BDT
                                    </p>
                                </td>
                                <td className="px-6 py-4">{order.district}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button className="btn btn-sm btn-success btn-soft">
                                        Complete
                                    </button>
                                    <button className="btn btn-sm btn-error btn-soft">
                                        Cancel
                                    </button>
                                    <button className="btn btn-sm btn-info btn-soft">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllOrders;
