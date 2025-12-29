import React, { useEffect, useState } from "react";
import {
    FaGreaterThan,
    FaTrashAlt,
    FaMinus,
    FaPlus,
    FaShoppingBag,
} from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { MdOutlineSupportAgent } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { HiOutlineTrophy } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const navigate = useNavigate();

    // Load Cart Data
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        // Ensure every item has a quantity property, default to 1 if missing
        const formattedCart = storedCart.map((item) => ({
            ...item,
            selectedQuantity: item.selectedQuantity || 1,
        }));
        setCartItems(formattedCart);
    }, []);

    // Calculate Total whenever cart changes
    useEffect(() => {
        const total = cartItems.reduce(
            (acc, item) => acc + item.price * item.selectedQuantity,
            0
        );
        setSubTotal(total);
    }, [cartItems]);

    // Update Quantity Handler
    const updateQuantity = (id, type) => {
        const updatedCart = cartItems.map((item) => {
            if (item._id === id) {
                let newQuantity = item.selectedQuantity;
                if (type === "inc") {
                    newQuantity += 1;
                } else if (type === "dec" && newQuantity > 1) {
                    newQuantity -= 1;
                }
                return { ...item, selectedQuantity: newQuantity };
            }
            return item;
        });

        setCartItems(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    // Remove Item Handler
    const handleRemoveFromCart = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to remove this item from cart?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b98e2f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedCart = cartItems.filter(
                    (item) => item._id !== productId
                );
                setCartItems(updatedCart);
                localStorage.setItem("cart", JSON.stringify(updatedCart));

                Swal.fire({
                    title: "Removed!",
                    text: "Product has been removed.",
                    icon: "success",
                    confirmButtonColor: "#b98e2f",
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
        });
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your cart is empty!",
                confirmButtonColor: "#b98e2f",
            });
        } else {
            navigate("/checkout", {
                state: { cartProducts: cartItems, totalPrice: subTotal },
            });
        }
    };

    return (
        <div className="bg-white">
            {/* Header */}
            <div
                style={{
                    backgroundImage: `url(${shopHeading})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                className="relative h-[250px] w-full flex flex-col justify-center items-center"
            >
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Cart
                    </h1>
                    <p className="font-medium flex items-center justify-center text-gray-800">
                        Home <FaGreaterThan className="mx-2 text-xs" /> Cart
                    </p>
                </div>
            </div>

            {/* Cart Content */}
            <div className="w-[95%] md:container mx-auto my-16">
                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Product Table */}
                        <div className="lg:col-span-2 overflow-x-auto">
                            <table className="w-full min-w-[600px] table-auto">
                                <thead className="bg-[#f9f1e7] h-16">
                                    <tr className="text-gray-800 font-semibold">
                                        <th className="rounded-l-lg pl-4 text-left">
                                            Product
                                        </th>
                                        <th className="text-left">Price</th>
                                        <th className="text-center">
                                            Quantity
                                        </th>
                                        <th className="text-left">Subtotal</th>
                                        <th className="rounded-r-lg pr-4"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="py-6 pl-4 flex items-center gap-4">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f9f1e7]">
                                                    <img
                                                        src={
                                                            product?.images
                                                                ? product
                                                                      .images[0]
                                                                : "https://i.ibb.co/7g0J3qY/Rectangle-1.png"
                                                        }
                                                        alt={product.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span
                                                    className="text-gray-500 font-medium max-w-[150px] truncate"
                                                    title={product.title}
                                                >
                                                    {product.title}
                                                </span>
                                            </td>
                                            <td className="text-gray-500">
                                                Tk{" "}
                                                {product.price.toLocaleString()}
                                            </td>
                                            <td className="text-center">
                                                <div className="inline-flex items-center border border-gray-300 rounded px-2 py-1 gap-3">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                product._id,
                                                                "dec"
                                                            )
                                                        }
                                                        className="text-gray-500 hover:text-[#b98e2f] transition disabled:opacity-50"
                                                        disabled={
                                                            product.selectedQuantity <=
                                                            1
                                                        }
                                                    >
                                                        <FaMinus size={10} />
                                                    </button>
                                                    <span className="font-medium text-gray-700 w-4 text-center">
                                                        {
                                                            product.selectedQuantity
                                                        }
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                product._id,
                                                                "inc"
                                                            )
                                                        }
                                                        className="text-gray-500 hover:text-[#b98e2f] transition"
                                                    >
                                                        <FaPlus size={10} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="text-gray-800 font-medium">
                                                Tk{" "}
                                                {(
                                                    product.price *
                                                    product.selectedQuantity
                                                ).toLocaleString()}
                                            </td>
                                            <td className="pr-4 text-right">
                                                <button
                                                    onClick={() =>
                                                        handleRemoveFromCart(
                                                            product._id
                                                        )
                                                    }
                                                    className="text-[#b98e2f] hover:text-red-600 transition p-2"
                                                >
                                                    <FaTrashAlt size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Cart Totals */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#f9f1e7] pt-8 pb-12 px-8 rounded-lg text-center sticky top-24">
                                <h2 className="text-3xl font-bold mb-10 text-gray-800">
                                    Cart Totals
                                </h2>

                                <div className="flex justify-between items-center mb-6">
                                    <span className="font-medium text-gray-800">
                                        Subtotal
                                    </span>
                                    <span className="text-gray-500">
                                        Tk {subTotal.toLocaleString()}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center mb-10">
                                    <span className="font-medium text-gray-800">
                                        Total
                                    </span>
                                    <span className="text-xl font-bold text-[#b98e2f]">
                                        Tk {subTotal.toLocaleString()}
                                    </span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="btn btn-block bg-transparent border border-black hover:bg-[#b98e2f] hover:border-[#b98e2f] hover:text-white text-black rounded-xl text-lg transition-all duration-300 shadow-none h-14"
                                >
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="bg-[#f9f1e7] p-6 rounded-full text-[#b98e2f]">
                            <FaShoppingBag size={50} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Your Cart is Empty
                        </h2>
                        <p className="text-gray-500">
                            Looks like you haven't added anything to your cart
                            yet.
                        </p>
                        <Link
                            to="/shop"
                            className="btn bg-[#b98e2f] text-white hover:bg-[#a17b2a] border-none px-8 mt-4"
                        >
                            Go to Shop
                        </Link>
                    </div>
                )}
            </div>

            {/* Features Section */}
            <div className="bg-[#f9f1e7] py-16 mt-16">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="text-6xl text-gray-800 group-hover:text-[#b98e2f] transition-colors duration-300">
                            <HiOutlineTrophy />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                High Quality
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                Crafted from top materials
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="text-6xl text-gray-800 group-hover:text-[#b98e2f] transition-colors duration-300">
                            <IoShieldCheckmarkOutline />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Warranty Protection
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                Over 2 years
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="text-6xl text-gray-800 group-hover:text-[#b98e2f] transition-colors duration-300">
                            <TbTruckDelivery />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Free Shipping
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                Order over 150 $
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="text-6xl text-gray-800 group-hover:text-[#b98e2f] transition-colors duration-300">
                            <MdOutlineSupportAgent />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                24/7 Support
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                Dedicated support
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
