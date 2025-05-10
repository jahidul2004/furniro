import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetch("https://furniro-server-bay.vercel.app/allProducts")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
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
                });
                const updatedProducts = products.filter((p) => p._id !== id);
                setProducts(updatedProducts);
            })
            .catch((error) => {
                console.error("Error deleting order:", error);
            });
    };

    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 bg-info text-white p-2 md:p-4 rounded">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <AiOutlineProduct className="text-white" />
                    Products
                </h2>
                <input
                    className="input text-black"
                    type="text"
                    placeholder="Search products by title or category"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto border border-gray-200">
                <table className="min-w-full bg-white shadow-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Added Date</th>
                            <th className="px-6 py-3">Added By</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts?.map((product) => (
                            <tr
                                key={product?._id}
                                className="border-t border-gray-200"
                            >
                                <td className="px-6 py-4">
                                    <img
                                        src={product?.images[0]}
                                        alt={product?.title}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {product?.title}
                                    <p className="flex items-center gap-2 text-[#b98e2f]">
                                        <FaBangladeshiTakaSign />
                                        {product?.price} BDT
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    {product?.addedDate
                                        ? product?.addedDate
                                        : "None"}{" "}
                                    <br />
                                    <span className="text-error">
                                        {product?.addedDate ? (
                                            <span className="text-sm text-gray-500">
                                                {(() => {
                                                    const addedDate = new Date(
                                                        product.addedDate
                                                    );
                                                    const now = new Date();
                                                    const diffInMs =
                                                        now - addedDate;
                                                    const diffInDays =
                                                        Math.floor(
                                                            diffInMs /
                                                                (1000 *
                                                                    60 *
                                                                    60 *
                                                                    24)
                                                        );
                                                    if (diffInDays === 0)
                                                        return "Today";
                                                    if (diffInDays === 1)
                                                        return "1 day ago";
                                                    return `${diffInDays} days ago`;
                                                })()}
                                            </span>
                                        ) : (
                                            <span className="text-sm text-gray-400">
                                                Date not available
                                            </span>
                                        )}
                                    </span>
                                </td>

                                <td>
                                    {product?.addedBy} <br />
                                    <span className="px-1 rounded-full text-info bg-[#f1faff]">
                                        {product?.addedByEmail}
                                    </span>
                                </td>

                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        onClick={() => {
                                            handleDeleteOrder(product?._id);
                                        }}
                                        className="btn btn-sm btn-error btn-soft"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/shop/${product?._id}`}
                                        className="btn btn-sm btn-info btn-soft"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;
