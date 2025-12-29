import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import {
    FaSearch,
    FaTrashAlt,
    FaEye,
    FaUser,
    FaCalendarAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://furniro-server-bay.vercel.app/allProducts")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = products.filter(
            (product) =>
                product.title?.toLowerCase().includes(lowercasedSearchTerm) ||
                product.category?.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    const handleDeleteOrder = (id) => {
        axios
            .delete(`https://furniro-server-bay.vercel.app/deleteProduct/${id}`)
            .then((res) => {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product deleted successfully",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    iconColor: "#b98e2f",
                });
                const updatedProducts = products.filter((p) => p._id !== id);
                setProducts(updatedProducts);
            })
            .catch((error) => {
                console.error("Error deleting order:", error);
            });
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
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <AiOutlineProduct className="text-[#b98e2f]" />
                        All Products
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your product inventory
                    </p>
                </div>

                <div className="relative w-full md:w-96">
                    <input
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-[#b98e2f] focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all shadow-sm"
                        type="text"
                        placeholder="Search by title or category..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                <th className="px-6 py-4">Product Info</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Added Details</th>
                                <th className="px-6 py-4">Added By</th>
                                <th className="px-6 py-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredProducts?.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <tr
                                        key={product?._id}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                                    <img
                                                        src={
                                                            product?.images?.[0]
                                                        }
                                                        alt={product?.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 text-base">
                                                        {product?.title}
                                                    </h3>
                                                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#b98e2f]/10 text-[#b98e2f] capitalize">
                                                        {product?.category ||
                                                            "Uncategorized"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <p className="flex items-center gap-1 font-bold text-gray-700">
                                                <FaBangladeshiTakaSign className="text-sm" />
                                                {product?.price?.toLocaleString()}
                                            </p>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm text-gray-700 font-medium flex items-center gap-2">
                                                    <FaCalendarAlt className="text-gray-400 text-xs" />
                                                    {product?.addedDate
                                                        ? new Date(
                                                              product.addedDate
                                                          ).toLocaleDateString()
                                                        : "N/A"}
                                                </span>
                                                <span className="text-xs text-gray-500 mt-1">
                                                    {product?.addedDate
                                                        ? (() => {
                                                              const addedDate =
                                                                  new Date(
                                                                      product.addedDate
                                                                  );
                                                              const now =
                                                                  new Date();
                                                              const diffInMs =
                                                                  now -
                                                                  addedDate;
                                                              const diffInDays =
                                                                  Math.floor(
                                                                      diffInMs /
                                                                          (1000 *
                                                                              60 *
                                                                              60 *
                                                                              24)
                                                                  );
                                                              if (
                                                                  diffInDays ===
                                                                  0
                                                              )
                                                                  return "Added Today";
                                                              if (
                                                                  diffInDays ===
                                                                  1
                                                              )
                                                                  return "1 day ago";
                                                              return `${diffInDays} days ago`;
                                                          })()
                                                        : "Date unavailable"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-800 flex items-center gap-2">
                                                    <FaUser className="text-gray-400 text-xs" />
                                                    {product?.addedBy ||
                                                        "Admin"}
                                                </span>
                                                <span
                                                    className="text-xs text-gray-500 truncate max-w-[150px]"
                                                    title={
                                                        product?.addedByEmail
                                                    }
                                                >
                                                    {product?.addedByEmail ||
                                                        "admin@furniro.com"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-3">
                                                <Link
                                                    to={`/shop/${product?._id}`}
                                                    className="p-2 rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm tooltip"
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteOrder(
                                                            product?._id
                                                        )
                                                    }
                                                    className="p-2 rounded bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                    title="Delete Product"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-10"
                                    >
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <AiOutlineProduct
                                                size={48}
                                                className="mb-2 opacity-50"
                                            />
                                            <p className="text-lg font-medium">
                                                No products found
                                            </p>
                                            <p className="text-sm">
                                                Try adjusting your search
                                                criteria
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 text-right text-xs text-gray-400">
                Showing {filteredProducts.length} results
            </div>
        </div>
    );
};

export default AllProducts;
