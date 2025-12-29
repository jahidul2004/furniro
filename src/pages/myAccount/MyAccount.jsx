import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
    FiLogOut,
    FiShoppingBag,
    FiStar,
    FiUser,
    FiBox,
    FiClock,
    FiCheckCircle,
} from "react-icons/fi";
import { TbCoinTaka } from "react-icons/tb";
import ReactStars from "react-stars";
import Modal from "react-modal";
import axios from "axios";

// Modal Styles (Customized for better look)
const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        zIndex: 1000,
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        padding: "0",
        border: "none",
        borderRadius: "16px",
        maxWidth: "500px",
        width: "90%",
        backgroundColor: "#fff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    },
};

Modal.setAppElement("#root"); // Accessibility fix if needed

const MyAccount = () => {
    const { user, logout, setDbUser } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard' | 'orders'

    // Review States
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewMessage, setReviewMessage] = useState("");

    // Stats Calculation
    const totalSpent = orders.reduce(
        (acc, order) => acc + (parseFloat(order.totalPrice) || 0),
        0
    );
    const pendingOrders = orders.filter((o) => o.status === "pending").length;

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            fetch(`https://furniro-server-bay.vercel.app/orders/${user?.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching orders:", error);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    // Handlers
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logged out of your account.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b98e2f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout",
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                    .then(() => {
                        setDbUser(null);
                        Swal.fire("Logged Out!", "See you soon.", "success");
                    })
                    .catch((err) => console.error(err));
            }
        });
    };

    const handleReview = (product) => {
        setCurrentProduct(product);
        setRating(0);
        setReviewMessage("");
        setModalIsOpen(true);
    };

    const handleSubmitReview = () => {
        if (rating === 0 || !reviewMessage.trim()) {
            Swal.fire({
                title: "Oops!",
                text: "Please provide a rating and a review.",
                icon: "warning",
                confirmButtonColor: "#b98e2f",
            });
            return;
        }

        const reviewData = {
            productId: currentProduct._id,
            productTitle: currentProduct.title,
            date: new Date().toLocaleDateString(),
            rating,
            reviewMessage,
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto:
                user?.photoURL ||
                "https://cdn-icons-png.flaticon.com/128/14722/14722327.png",
        };

        axios
            .post("https://furniro-server-bay.vercel.app/addReview", reviewData)
            .then(() => {
                Swal.fire({
                    title: "Thank You!",
                    text: "Review submitted successfully!",
                    icon: "success",
                    confirmButtonColor: "#b98e2f",
                });
                setModalIsOpen(false);
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error",
                    text: "Something went wrong.",
                    icon: "error",
                });
                console.error(err);
            });
    };

    // Helper for Status Badge
    const getStatusBadge = (status) => {
        switch (status) {
            case "pending":
                return (
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold border border-yellow-200">
                        Pending
                    </span>
                );
            case "cancelled":
                return (
                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200">
                        Cancelled
                    </span>
                );
            default:
                return (
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                        Delivered
                    </span>
                );
        }
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#b98e2f]"></span>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* --- Sidebar Area --- */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-[#b98e2f]/10 z-0"></div>
                        <div className="relative z-10 w-24 h-24 rounded-full border-4 border-white shadow-md mb-4 overflow-hidden bg-gray-200">
                            <img
                                src={
                                    user?.photoURL ||
                                    "https://cdn-icons-png.flaticon.com/128/17927/17927284.png"
                                }
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="relative z-10 text-xl font-bold text-gray-800">
                            {user?.displayName || "Dear Customer"}
                        </h2>
                        <p className="relative z-10 text-sm text-gray-500 mb-6">
                            {user?.email}
                        </p>

                        <div className="w-full flex flex-col gap-2 relative z-10">
                            <button
                                onClick={() => setActiveTab("dashboard")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    activeTab === "dashboard"
                                        ? "bg-[#b98e2f] text-white shadow-md"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <FiUser className="text-lg" /> Dashboard
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                                    activeTab === "orders"
                                        ? "bg-[#b98e2f] text-white shadow-md"
                                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <FiShoppingBag className="text-lg" /> My Orders
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all mt-4"
                            >
                                <FiLogOut className="text-lg" /> Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Main Content Area --- */}
                <div className="lg:col-span-3">
                    {/* Tab: Dashboard Overview */}
                    {activeTab === "dashboard" && (
                        <div className="space-y-6 animate-fade-in">
                            <h1 className="text-2xl font-bold text-gray-800">
                                Hello, {user?.displayName?.split(" ")[0]}! 👋
                            </h1>

                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                    <div className="p-4 rounded-full bg-[#b98e2f]/10 text-[#b98e2f]">
                                        <FiBox size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Total Orders
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {orders.length}
                                        </h3>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                    <div className="p-4 rounded-full bg-blue-50 text-blue-600">
                                        <FiClock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Pending Orders
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {pendingOrders}
                                        </h3>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                                    <div className="p-4 rounded-full bg-green-50 text-green-600">
                                        <TbCoinTaka size={28} />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">
                                            Total Spent
                                        </p>
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {totalSpent} BDT
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity / Prompt */}
                            <div className="bg-[#b98e2f] rounded-2xl p-8 text-white flex flex-col md:flex-row justify-between items-center shadow-lg">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Continue Shopping?
                                    </h3>
                                    <p className="opacity-90">
                                        Explore our new collection and give your
                                        home a fresh look.
                                    </p>
                                </div>
                                <Link
                                    to="/shop"
                                    className="mt-4 md:mt-0 bg-white text-[#b98e2f] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition shadow-md"
                                >
                                    Go to Shop
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Tab: My Orders */}
                    {activeTab === "orders" && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                    <FiShoppingBag className="text-[#b98e2f]" />{" "}
                                    Order History
                                </h2>
                                <span className="text-sm text-gray-500">
                                    {orders.length} Orders found
                                </span>
                            </div>

                            {orders.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                                        <FiShoppingBag size={30} />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-600">
                                        No orders yet
                                    </h3>
                                    <Link
                                        to="/shop"
                                        className="text-[#b98e2f] hover:underline mt-2 inline-block"
                                    >
                                        Start Shopping
                                    </Link>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {orders.map((order) => (
                                        <div
                                            key={order._id}
                                            className="p-6 hover:bg-gray-50 transition-colors"
                                        >
                                            {/* Order Header */}
                                            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold">
                                                        Order ID
                                                    </p>
                                                    <p className="text-sm font-bold text-gray-800">
                                                        #{order._id.slice(-6)}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold">
                                                        Date
                                                    </p>
                                                    <p className="text-sm text-gray-700">
                                                        {order.orderDate}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 uppercase font-semibold">
                                                        Total Amount
                                                    </p>
                                                    <p className="text-sm font-bold text-[#b98e2f] flex items-center">
                                                        <TbCoinTaka />{" "}
                                                        {order.totalPrice}
                                                    </p>
                                                </div>
                                                <div>
                                                    {getStatusBadge(
                                                        order.status
                                                    )}
                                                </div>
                                            </div>

                                            {/* Order Items Table - Clean Look */}
                                            <div className="bg-gray-50 rounded-lg p-3 overflow-x-auto">
                                                <table className="w-full min-w-[500px]">
                                                    <thead>
                                                        <tr className="text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
                                                            <th className="pb-2">
                                                                Product
                                                            </th>
                                                            <th className="pb-2">
                                                                Action
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {order.orderedProducts.map(
                                                            (product) => (
                                                                <tr
                                                                    key={
                                                                        product._id
                                                                    }
                                                                >
                                                                    <td className="py-3">
                                                                        <div className="flex items-center gap-3">
                                                                            <img
                                                                                src={
                                                                                    product.images
                                                                                }
                                                                                alt={
                                                                                    product.title
                                                                                }
                                                                                className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                                                            />
                                                                            <div>
                                                                                <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                                                                                    {
                                                                                        product.title
                                                                                    }
                                                                                </p>
                                                                                <Link
                                                                                    to={`/shop/${product._id}`}
                                                                                    className="text-xs text-[#b98e2f] hover:underline"
                                                                                >
                                                                                    View
                                                                                    Product
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-3 text-right">
                                                                        {order.status ===
                                                                            "delivered" ||
                                                                        order.status ===
                                                                            "completed" ? (
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleReview(
                                                                                        product
                                                                                    )
                                                                                }
                                                                                className="flex items-center gap-1 text-sm bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded hover:border-[#b98e2f] hover:text-[#b98e2f] transition"
                                                                            >
                                                                                <FiStar className="text-yellow-400" />{" "}
                                                                                Review
                                                                            </button>
                                                                        ) : (
                                                                            <span className="text-xs text-gray-400 italic">
                                                                                Wait
                                                                                for
                                                                                delivery
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Review Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Review Product"
            >
                <div className="p-0">
                    {/* Modal Header */}
                    <div className="bg-[#b98e2f] p-4 flex justify-between items-center rounded-t-xl">
                        <h2 className="text-white font-bold text-lg flex items-center gap-2">
                            <FiCheckCircle /> Write a Review
                        </h2>
                        <button
                            onClick={() => setModalIsOpen(false)}
                            className="text-white hover:text-gray-200 font-bold text-xl"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <p className="text-gray-600 mb-2 text-sm">
                            How was your experience with:
                        </p>
                        <h3 className="font-bold text-gray-800 mb-4">
                            {currentProduct?.title}
                        </h3>

                        <div className="flex flex-col items-center mb-6 bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-semibold text-gray-500 mb-1">
                                Tap to Rate
                            </p>
                            <ReactStars
                                count={5}
                                onChange={setRating}
                                size={36}
                                value={rating}
                                half={false}
                                color2={"#b98e2f"}
                                color1={"#e5e7eb"}
                            />
                        </div>

                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Your Feedback
                        </label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b98e2f]/50 transition-all text-sm"
                            rows="4"
                            placeholder="Tell us what you liked or didn't like..."
                            value={reviewMessage}
                            onChange={(e) => setReviewMessage(e.target.value)}
                        />

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setModalIsOpen(false)}
                                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition text-sm font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmitReview}
                                className="px-6 py-2 bg-[#b98e2f] text-white rounded-lg hover:bg-[#a17b2a] transition shadow-md text-sm font-bold"
                            >
                                Submit Review
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default MyAccount;
