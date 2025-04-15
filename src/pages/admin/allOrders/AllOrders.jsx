import React from "react";

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
            return "bg-yellow-100 text-yellow-800";
        case "completed":
            return "bg-green-100 text-green-800";
        case "cancelled":
            return "bg-red-100 text-red-800";
        default:
            return "";
    }
};

const AllOrders = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">All Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">District</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-t">
                                <td className="px-6 py-4">
                                    <img
                                        src={order.image}
                                        alt={order.title}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {order.title}
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
                                    <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                                        Complete
                                    </button>
                                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm">
                                        Cancel
                                    </button>
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
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
