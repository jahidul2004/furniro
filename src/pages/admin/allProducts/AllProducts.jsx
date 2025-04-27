import { useEffect, useState } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/allProducts")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    });
    return (
        <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <AiOutlineProduct className="text-info" />
                    Products
                </h2>
                <input
                    className="input"
                    type="text"
                    placeholder="Search products by title or category"
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
                        {products?.map((product) => (
                            <tr
                                key={product?.id}
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
                                    <br />{" "}
                                    <span className="text-error">
                                        19 days ago
                                    </span>
                                </td>

                                <td>
                                    Jahidul Islam Jihad <br />{" "}
                                    <span className="px-1 rounded-full text-info bg-[#f1faff]">
                                        abc@gmail.com
                                    </span>
                                </td>

                                <td className="px-6 py-4 flex gap-2">
                                    <button className="btn btn-sm btn-error btn-soft">
                                        Delete
                                    </button>
                                    <button className="btn btn-sm btn-info btn-soft">
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

export default AllProducts;
