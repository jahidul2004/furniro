import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { HiOutlineViewGrid } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { TbCoinTaka } from "react-icons/tb";
import { TiInputChecked } from "react-icons/ti";
import Swal from "sweetalert2";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/pendingOrders")
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error("Error fetching orders:", error));
    }, [selectedOrder]);

    const mergeDuplicateProducts = (products) => {
        const merged = {};
        products.forEach((product) => {
            const id = product._id;
            if (merged[id]) {
                merged[id].quantity += 1;
            } else {
                merged[id] = { ...product, quantity: 1 };
            }
        });
        return Object.values(merged);
    };

    const handleCompleteOrder = (orderId) => {
        axios
            .put(`http://localhost:3000/updateOrder/${orderId}`, {
                status: "completed",
            })
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Order Completed",
                    text: "The order has been marked as completed.",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: "top-end",
                });
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId
                            ? { ...order, status: "completed" }
                            : order
                    )
                );
                setSelectedOrder(null);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "There was an error completing the order.",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    toast: true,
                    position: "top-end",
                });
                console.error("Error completing order:", error);
            });
    };
    const handleCancelOrder = (orderId) => {
        axios
            .put(`http://localhost:3000/updateOrder/${orderId}`, {
                status: "cancelled",
            })
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Order Cancelled",
                    text: "The order has been cancelled.",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: "top-end",
                });
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId
                            ? { ...order, status: "cancelled" }
                            : order
                    )
                );
                setSelectedOrder(null);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "There was an error completing the order.",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    toast: true,
                    position: "top-end",
                });
                console.error("Error completing order:", error);
            });
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <HiOutlineViewGrid className="text-info" />
                    Pending Orders
                </h2>
                <input
                    className="input"
                    type="text"
                    placeholder="Search order by title, location, status"
                />
            </div>

            {orders?.map((order, index) => {
                const mergedProducts = mergeDuplicateProducts(
                    order?.orderedProducts || []
                );
                return (
                    <div
                        key={order._id}
                        className="overflow-x-auto my-2 md:my-4 border rounded border-info"
                    >
                        <div className="bg-info text-white rounded-t p-1 flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-2 px-4">
                            <h1 className="font-bold">{order?.name}</h1>
                            <h1 className="text-lg font-semibold flex flex-col md:flex-row items-center gap-2">
                                {index + 1}. Order ID: #{order?._id}
                                <TbCoinTaka /> {order?.totalPrice} BDT
                            </h1>
                            <button
                                className="btn btn-sm btn-info btn-soft"
                                onClick={() => setSelectedOrder(order)}
                            >
                                View Details
                            </button>
                        </div>

                        <table className="rounded-b min-w-full bg-white shadow-md overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr className="text-left text-sm font-semibold text-gray-600">
                                    <th className="px-6 py-3">Image</th>
                                    <th className="px-6 py-3">Title</th>
                                    <th className="px-6 py-3">Order Time</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mergedProducts.map((product, i) => (
                                    <tr
                                        key={i}
                                        className="border-t border-gray-200"
                                    >
                                        <td className="px-6 py-4">
                                            <img
                                                src={product?.images}
                                                alt=""
                                                className="w-14 h-14 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {product?.title}
                                            <p className="flex items-center gap-2 text-[#b98e2f]">
                                                <FaBangladeshiTakaSign />
                                                {product?.price} BDT
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Qty: {product?.quantity}
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
                );
            })}

            {/* Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md max-w-xl w-full relative">
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">
                            Order Details - #{selectedOrder?._id}
                        </h2>
                        {/* Personal details */}
                        <div className="border rounded p-2 border-success border-dashed">
                            <h1 className="btn btn-soft pointer-events-none mb-2 btn-success w-full font-bold text-lg">
                                Personal details
                            </h1>
                            <p>
                                <strong>Name:</strong> {selectedOrder?.name}
                            </p>
                            <p>
                                <strong>Email:</strong> {selectedOrder?.email}
                            </p>
                            <p>
                                <strong>Phone:</strong> {selectedOrder?.phone}
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {selectedOrder?.address}, {selectedOrder?.city},{" "}
                                {selectedOrder?.zip}
                            </p>
                        </div>
                        {/* Personal details end */}

                        {/* Order related details */}
                        <div className="mt-2 border rounded p-2 border-info border-dashed">
                            <h1 className="btn btn-soft pointer-events-none mb-2 btn-info w-full font-bold text-lg">
                                Ordered details
                            </h1>
                            <p>
                                <strong>Date: </strong>
                                {selectedOrder?.orderDate}
                            </p>
                            <p>
                                <strong>Total Price: </strong>
                                {selectedOrder?.totalPrice}
                            </p>
                            <p>
                                <strong>Payment Method: </strong>
                                {selectedOrder?.paymentMethod}
                            </p>
                            <p>
                                <strong>Status: </strong>
                                {selectedOrder?.status}
                            </p>
                        </div>
                        {/* Order related details end */}

                        <div className="mt-2 border rounded p-2 border-error border-dashed">
                            <h3 className="btn btn-soft pointer-events-none mb-2 btn-error w-full font-bold text-lg">
                                Products Details:
                            </h3>
                            <ul className="list-disc list-inside space-y-1">
                                {mergeDuplicateProducts(
                                    selectedOrder?.orderedProducts
                                ).map((p, idx) => (
                                    <li key={idx}>
                                        {p.title} - {p.quantity} pcs - {p.price}{" "}
                                        BDT each
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Additional info */}
                        <div className="mt-2 border rounded p-2 border-warning border-dashed">
                            <h1 className="btn btn-soft pointer-events-none mb-2 btn-warning w-full font-bold text-lg">
                                Additional Info
                            </h1>
                            <p>{selectedOrder?.additionalInfo}</p>
                        </div>
                        {/* Additional info end */}

                        {/* Actions */}
                        <div className="flex justify-center gap-2 md:gap-4 items-center mt-2 border rounded p-2 border-success border-dashed">
                            <button
                                onClick={() => {
                                    handleCompleteOrder(selectedOrder?._id);
                                }}
                                className="btn btn-soft btn-success"
                            >
                                Complete Order <TiInputChecked />
                            </button>
                            <button
                                onClick={() => {
                                    handleCancelOrder(selectedOrder?._id);
                                }}
                                className="btn btn-soft btn-error"
                            >
                                Cancel Order <MdOutlineCancel />
                            </button>
                        </div>
                        {/* Actions end */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AllOrders;
