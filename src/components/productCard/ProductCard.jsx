import React from "react";
import { Link } from "react-router-dom";
import { FaShareAlt, FaRegHeart, FaExchangeAlt } from "react-icons/fa";

const ProductCard = ({ data }) => {
    const { title, shortDescription, price, images, isNew, discount, _id } =
        data || {};

    // Calculate discounted price logic (Optional: assuming discount is percentage)
    // If you don't need calculation, you can remove this part.
    const hasDiscount = discount && discount > 0;

    return (
        <div className="group relative bg-[#F4F5F7] overflow-hidden rounded-sm transition-all duration-300 hover:shadow-xl">
            {/* Image Section */}
            <div className="relative h-[300px] w-full overflow-hidden">
                <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    src={
                        images && images.length > 0
                            ? images[0]
                            : "https://i.ibb.co/7g0J3qY/Rectangle-1.png"
                    }
                    alt={title}
                />

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-4">
                    <Link
                        to={`/shop/${_id}`}
                        className="bg-white text-[#b98e2f] font-bold px-10 py-3 rounded-sm hover:bg-[#b98e2f] hover:text-white transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                    >
                        View Details
                    </Link>

                    {/* Action Icons (Decorative/Functional) */}
                    <div className="flex gap-4 text-white text-sm font-semibold translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                        <button className="flex items-center gap-1 hover:text-[#b98e2f] transition-colors">
                            <FaShareAlt /> Share
                        </button>
                        <button className="flex items-center gap-1 hover:text-[#b98e2f] transition-colors">
                            <FaExchangeAlt /> Compare
                        </button>
                        <button className="flex items-center gap-1 hover:text-[#b98e2f] transition-colors">
                            <FaRegHeart /> Like
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 pb-6">
                <h3 className="text-xl font-bold text-[#3a3a3a] mb-1 truncate">
                    {title}
                </h3>
                <p className="text-[#898989] text-sm font-medium mb-2 truncate">
                    {shortDescription}
                </p>

                <div className="flex items-center justify-between gap-2 mt-2">
                    <span className="text-xl font-bold text-[#3a3a3a]">
                        Tk {price?.toLocaleString()}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-[#b0b0b0] line-through">
                            Tk{" "}
                            {(
                                price +
                                (price * discount) / 100
                            ).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>

            {/* Badges (New / Discount) */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
                {isNew && (
                    <div className="w-12 h-12 bg-[#2ec1ac] rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                        New
                    </div>
                )}
                {hasDiscount && (
                    <div className="w-12 h-12 bg-[#e97171] rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                        -{discount}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
