import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { HiOutlineCurrencyDollar, HiOutlineViewGrid } from "react-icons/hi";
import { TbCoinTaka } from "react-icons/tb";
import ReactStars from "react-stars"; // Import react-stars for rating
import Modal from "react-modal"; // Import modal component for review
import axios from "axios";

// Modal custom styles
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        borderRadius: "10px",
        maxWidth: "500px",
        width: "90%",
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
};

const MyAccount = () => {
    const { user, logout, setDbUser } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [reviewMessage, setReviewMessage] = useState("");

    useEffect(() => {
        fetch(`https://furniro-server-bay.vercel.app/orders/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, [user?.email]);

    // Handle review button click
    const handleReview = (product) => {
        setCurrentProduct(product);
        setModalIsOpen(true);
    };

    // Handle review form submission
    const handleSubmitReview = () => {
        if (rating === 0 || !reviewMessage) {
            Swal.fire({
                title: "Error!",
                text: "Please provide both rating and review message.",
                icon: "error",
                confirmButtonText: "Close",
            });
            return;
        }

        const reviewData = {
            productId: currentProduct._id,
            date: new Date().toLocaleDateString(),
            rating,
            reviewMessage,
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL
                ? user.photoURL
                : "https://cdn-icons-png.flaticon.com/128/14722/14722327.png",
        };

        axios
            .post("https://furniro-server-bay.vercel.app/addReview", reviewData)
            .then((res) => {
                Swal.fire({
                    title: "Success!",
                    text: "Review submitted successfully!",
                    icon: "success",
                    confirmButtonText: "Close",
                });
                setModalIsOpen(false);
            })
            .catch((err) => {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to submit review. Please try again.",
                    icon: "error",
                    confirmButtonText: "Close",
                });
                console.error("Error submitting review:", err);
            });
    };

    return (
        <div className="w-[95%] md:container mx-auto my-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Profile area */}
            <div>
                {/* Profile card */}
                <div className="w-full h-[400px] shadow-lg rounded-lg p-4 border-t-16 border-[#b98e2f]">
                    <img
                        className="w-full h-full rounded"
                        src={
                            user?.photoURL
                                ? user.photoURL
                                : "https://cdn-icons-png.flaticon.com/128/18557/18557239.png"
                        }
                        alt="User Profile"
                    />
                </div>

                <div className="my-5 text-center shadow-lg rounded-lg p-4 py-6 bg-[#b98e2f] text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        {user?.displayName}
                    </h1>
                    <p className="mb-4">{user?.email}</p>
                    <div className="flex justify-center items-center gap-1">
                        <button
                            onClick={() => {
                                logout()
                                    .then(() => {
                                        Swal.fire({
                                            title: "Success",
                                            text: "Logout successful",
                                            icon: "success",
                                            confirmButtonText: "Close",
                                        });
                                        setDbUser(null);
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "Logout error:",
                                            error.message
                                        );
                                        Swal.fire({
                                            title: "Error!",
                                            text: error.message,
                                            icon: "error",
                                            confirmButtonText: "Close",
                                        });
                                    });
                            }}
                            className="btn bg-white text-[#b98e2f] border-none shadow-none"
                        >
                            <CgArrowLeftO />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            {/* Profile area end */}

            {/* Action area */}
            <div className="col-span-1 md:col-span-2">
                {/* My Orders */}
                <div className="border p-2 border-gray-200 rounded">
                    <h1 className="flex items-center gap-2 text-white text-2xl font-bold bg-[#b98e2f] p-2 rounded">
                        <HiOutlineViewGrid />
                        My Orders
                    </h1>
                    <div>
                        {orders?.map((order, index) => (
                            <div className="my-2 md:my-4" key={order._id}>
                                <div className="bg-[#b98e2f] text-white rounded-t p-1 flex justify-between items-center">
                                    <h1 className="text-lg font-semibold flex items-center gap-2">
                                        {index + 1}. Order ID: #{order._id}
                                        <TbCoinTaka /> {order.totalPrice} BDT
                                    </h1>
                                </div>
                                <table className="rounded-b min-w-full bg-white shadow-md overflow-hidden">
                                    <thead className="bg-gray-100">
                                        <tr className="text-left text-sm font-semibold text-gray-600">
                                            <th className="px-6 py-3">Image</th>
                                            <th className="px-6 py-3">Title</th>
                                            <th className="px-6 py-3">
                                                Order Time
                                            </th>
                                            <th className="px-6 py-3">
                                                Status
                                            </th>
                                            <th className="px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.orderedProducts?.map(
                                            (product) => (
                                                <tr
                                                    key={product?._id}
                                                    className="border-t border-gray-200"
                                                >
                                                    <td className="px-6 py-4">
                                                        <img
                                                            src={
                                                                product?.images
                                                            }
                                                            alt={product?.title}
                                                            className="w-14 h-14 object-cover rounded"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">
                                                        {product?.title}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {order?.orderDate}
                                                    </td>
                                                    <td
                                                        className={`px-6 py-4 ${
                                                            order?.status ===
                                                            "pending"
                                                                ? "text-warning"
                                                                : order?.status ===
                                                                  "cancelled"
                                                                ? "text-error"
                                                                : "text-success"
                                                        }`}
                                                    >
                                                        {order?.status}
                                                    </td>
                                                    <td className="px-6 py-4 flex gap-2">
                                                        <button
                                                            onClick={() =>
                                                                handleReview(
                                                                    product
                                                                )
                                                            }
                                                            className={`btn btn-sm btn-soft ${
                                                                order?.status ===
                                                                "pending"
                                                                    ? "btn-warning pointer-events-none"
                                                                    : order?.status ===
                                                                      "cancelled"
                                                                    ? "pointer-events-none btn-error"
                                                                    : "btn-success"
                                                            }`}
                                                        >
                                                            Make Review
                                                        </button>
                                                        <Link
                                                            className="btn btn-sm btn-soft btn-info"
                                                            to={`/shop/${product?._id}`}
                                                        >
                                                            View Product
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Action area end */}

            {/* Modal for review */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={customStyles}
                contentLabel="Review Product"
            >
                <h2 className="text-xl font-bold mb-4">
                    {currentProduct?.title} - Review
                </h2>
                <div className="flex items-center gap-4 mb-4">
                    <ReactStars
                        count={5}
                        onChange={setRating}
                        size={24}
                        value={rating}
                        half={false}
                        color2={"#ffd700"}
                    />
                </div>
                <textarea
                    className="w-full p-2 border rounded mb-4"
                    rows="4"
                    placeholder="Write your review here..."
                    value={reviewMessage}
                    onChange={(e) => setReviewMessage(e.target.value)}
                />
                <button
                    onClick={handleSubmitReview}
                    className="btn bg-[#b98e2f] text-white shadow-none border-none"
                >
                    Submit Review
                </button>
            </Modal>
        </div>
    );
};

export default MyAccount;
