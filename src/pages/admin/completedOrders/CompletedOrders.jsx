import React, { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { HiOutlineViewGrid, HiOutlineClipboardCheck } from "react-icons/hi";
import { TbCoinTaka } from "react-icons/tb";
import {
    FaUser,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhoneAlt,
    FaBoxOpen,
    FaCheckCircle,
    FaCalendarAlt,
} from "react-icons/fa";

const CompletedOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://furniro-server-bay.vercel.app/completedOrders")
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                setLoading(false);
            });
    }, []);

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

    if (loading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#b98e2f]"></span>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <HiOutlineClipboardCheck className="text-green-600" />
                        Completed Orders
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        History of all successfully delivered orders
                    </p>
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-semibold text-gray-600 border border-gray-200">
                    Total Completed:{" "}
                    <span className="text-green-600">{orders.length}</span>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-[60vh] bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="bg-green-50 p-6 rounded-full text-green-500 mb-4">
                        <FaCheckCircle size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-700">
                        No Completed Orders
                    </h2>
                    <p className="text-gray-500 mt-2">
                        You haven't completed any orders yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => {
                        const mergedProducts = mergeDuplicateProducts(
                            order?.orderedProducts || []
                        );
                        return (
                            <div
                                key={order._id}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {/* Order Card Header */}
                                <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-100">
                                    <div className="flex items-center gap-4">
                                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm font-bold">
                                            #{order._id.slice(-6).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">
                                                {order.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                <FaMapMarkerAlt size={10} />{" "}
                                                {order.city}, {order.address}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden md:block">
                                            <p className="text-xs text-gray-500">
                                                Total Paid
                                            </p>
                                            <p className="font-bold text-gray-800 flex items-center justify-end gap-1">
                                                <TbCoinTaka size={18} />{" "}
                                                {order.totalPrice}
                                            </p>
                                        </div>
                                        <div className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-green-100 text-green-700 flex items-center gap-1">
                                            <FaCheckCircle /> Completed
                                        </div>
                                        <button
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                            className="px-4 py-2 border border-gray-300 text-gray-600 text-sm font-semibold rounded hover:bg-gray-100 transition-colors"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>

                                {/* Mini Product Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-gray-500 uppercase bg-white border-b border-gray-100">
                                            <tr>
                                                <th className="px-6 py-3 font-medium">
                                                    Product
                                                </th>
                                                <th className="px-6 py-3 font-medium">
                                                    Quantity
                                                </th>
                                                <th className="px-6 py-3 font-medium">
                                                    Price
                                                </th>
                                                <th className="px-6 py-3 font-medium">
                                                    Order Date
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {mergedProducts.map(
                                                (product, i) => (
                                                    <tr
                                                        key={i}
                                                        className="bg-white border-b border-gray-50 last:border-none hover:bg-gray-50"
                                                    >
                                                        <td className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3">
                                                            <img
                                                                src={
                                                                    product.images
                                                                }
                                                                alt=""
                                                                className="w-8 h-8 rounded object-cover border border-gray-200"
                                                            />
                                                            {product.title}
                                                        </td>
                                                        <td className="px-6 py-3 text-gray-500">
                                                            x {product.quantity}
                                                        </td>
                                                        <td className="px-6 py-3 text-gray-500 flex items-center">
                                                            <FaBangladeshiTakaSign className="text-xs" />{" "}
                                                            {product.price}
                                                        </td>
                                                        <td className="px-6 py-3 text-gray-500">
                                                            {order.orderDate}
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Detailed Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white z-10 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    Order Details{" "}
                                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                        Completed
                                    </span>
                                </h3>
                                <p className="text-sm text-gray-500">
                                    ID: #{selectedOrder._id}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition text-gray-500 text-2xl"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Col: Customer Info */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FaUser className="text-[#b98e2f]" />{" "}
                                        Customer Information
                                    </h4>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex gap-3">
                                            <FaUser className="text-gray-400 mt-1" />
                                            <div>
                                                <p className="font-semibold text-gray-700">
                                                    Name
                                                </p>
                                                <p className="text-gray-600">
                                                    {selectedOrder.name}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <FaEnvelope className="text-gray-400 mt-1" />
                                            <div>
                                                <p className="font-semibold text-gray-700">
                                                    Email
                                                </p>
                                                <p className="text-gray-600">
                                                    {selectedOrder.email}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <FaPhoneAlt className="text-gray-400 mt-1" />
                                            <div>
                                                <p className="font-semibold text-gray-700">
                                                    Phone
                                                </p>
                                                <p className="text-gray-600">
                                                    {selectedOrder.phone}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-[#b98e2f]" />{" "}
                                        Shipping Address
                                    </h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {selectedOrder.address}, <br />
                                        {selectedOrder.city} -{" "}
                                        {selectedOrder.zip}
                                    </p>
                                    {selectedOrder.additionalInfo && (
                                        <div className="mt-4 pt-4 border-t border-gray-200">
                                            <p className="text-xs font-bold text-gray-500 uppercase">
                                                Note
                                            </p>
                                            <p className="text-sm text-gray-600 italic">
                                                "{selectedOrder.additionalInfo}"
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Col: Order Summary */}
                            <div className="flex flex-col h-full">
                                <div className="bg-white border border-gray-200 rounded-xl p-5 flex-1 h-full">
                                    <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <FaBoxOpen className="text-[#b98e2f]" />{" "}
                                        Order Summary
                                    </h4>
                                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {mergeDuplicateProducts(
                                            selectedOrder.orderedProducts
                                        ).map((product, idx) => (
                                            <div
                                                key={idx}
                                                className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded bg-gray-100 overflow-hidden">
                                                        <img
                                                            src={product.images}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            {product.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            Qty:{" "}
                                                            {product.quantity}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="text-sm font-bold text-gray-700">
                                                    {product.price *
                                                        product.quantity}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-dashed border-gray-300">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-500 flex items-center gap-2">
                                                <FaCalendarAlt /> Order Date
                                            </span>
                                            <span className="text-sm font-medium text-gray-800">
                                                {selectedOrder.orderDate}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm text-gray-500">
                                                Payment Method
                                            </span>
                                            <span className="text-sm font-medium text-gray-800 uppercase">
                                                {selectedOrder.paymentMethod}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-center mt-4 text-lg font-bold text-green-600 bg-green-50 p-3 rounded-lg">
                                            <span>Total Amount</span>
                                            <span className="flex items-center">
                                                <TbCoinTaka />{" "}
                                                {selectedOrder.totalPrice}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompletedOrders;
