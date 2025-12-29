import React, { useEffect, useState } from "react";
import {
    FaGreaterThan,
    FaTrashAlt,
    FaCartPlus,
    FaHeartBroken,
} from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const WishList = () => {
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        const wishlistItems =
            JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistProducts(wishlistItems);
    }, []);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Check if item already exists in cart
        const isExist = cart.find((item) => item._id === product._id);

        if (isExist) {
            Swal.fire({
                icon: "info",
                title: "Already in Cart",
                text: "This product is already in your shopping cart.",
                confirmButtonColor: "#b98e2f",
            });
            return;
        }

        // Add default quantity
        const productWithQty = { ...product, selectedQuantity: 1 };
        cart.push(productWithQty);
        localStorage.setItem("cart", JSON.stringify(cart));

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Added to Cart",
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            background: "#fff",
            iconColor: "#b98e2f",
        });
    };

    const handleRemoveFromWishlist = (productId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Remove this item from wishlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#b98e2f",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const wishlist =
                    JSON.parse(localStorage.getItem("wishlist")) || [];
                const updatedWishlist = wishlist.filter(
                    (item) => item._id !== productId
                );

                setWishlistProducts(updatedWishlist);
                localStorage.setItem(
                    "wishlist",
                    JSON.stringify(updatedWishlist)
                );

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Removed from Wishlist",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                });
            }
        });
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
                        Wishlist
                    </h1>
                    <p className="font-medium flex items-center justify-center text-gray-800">
                        Home <FaGreaterThan className="mx-2 text-xs" /> Wishlist
                    </p>
                </div>
            </div>

            {/* Product List */}
            <div className="w-[95%] md:container mx-auto my-16">
                {wishlistProducts.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] table-auto">
                            <thead className="bg-[#f9f1e7] h-16">
                                <tr className="text-gray-800 font-semibold">
                                    <th className="rounded-l-lg pl-4 text-left">
                                        Product
                                    </th>
                                    <th className="text-left">Price</th>
                                    <th className="text-center">
                                        Stock Status
                                    </th>
                                    <th className="rounded-r-lg text-center">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistProducts.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="py-6 pl-4 flex items-center gap-4">
                                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#f9f1e7]">
                                                <img
                                                    src={
                                                        product?.images?.[0] ||
                                                        "https://i.ibb.co/6H3xY0N/placeholder.png"
                                                    }
                                                    alt={product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span
                                                className="text-gray-700 font-bold max-w-[200px] truncate"
                                                title={product.title}
                                            >
                                                {product.title}
                                            </span>
                                        </td>
                                        <td className="text-gray-500 font-medium">
                                            Tk {product.price}
                                        </td>
                                        <td className="text-center">
                                            <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-xs font-bold">
                                                In Stock
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <button
                                                    onClick={() =>
                                                        handleAddToCart(product)
                                                    }
                                                    className="btn btn-sm bg-[#b98e2f] hover:bg-[#a17b2a] text-white border-none flex items-center gap-2"
                                                >
                                                    <FaCartPlus /> Add to Cart
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        handleRemoveFromWishlist(
                                                            product._id
                                                        )
                                                    }
                                                    className="btn btn-sm btn-ghost text-red-500 hover:bg-red-50"
                                                    title="Remove"
                                                >
                                                    <FaTrashAlt size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // Empty State
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                        <div className="bg-[#f9f1e7] p-6 rounded-full text-[#b98e2f]">
                            <FaHeartBroken size={50} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Your Wishlist is Empty
                        </h2>
                        <p className="text-gray-500">
                            Seems like you don't have any favorite items yet.
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
        </div>
    );
};

export default WishList;
