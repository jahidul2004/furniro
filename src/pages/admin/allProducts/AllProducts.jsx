import { AiOutlineProduct } from "react-icons/ai";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const AllProducts = () => {
    const products = [
        {
            id: 1,
            image: "https://i.ibb.co.com/qFWn8JfB/furniture-styles-Getty-Images-1467984982-512fed4077b646eabbc187619554d517.jpg",
            title: "Modern Wooden Chair",
            district: "01/01/2024",
            status: "ofs",
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/vCsPjzkX/images.jpg",
            title: "Elegant Sofa Set",
            district: "01/01/2024",
            status: "available",
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/Xr5MCRyN/hero1.jpg",
            title: "Glass Coffee Table",
            district: "01/01/2024",
            status: "available",
        },
        {
            id: 4,
            image: "https://i.ibb.co.com/Xr5MCRyN/hero1.jpg",
            title: "Coffee Table Set",
            district: "01/01/2024",
            status: "ofs",
        },
    ];
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
                                        src={product?.image}
                                        alt={product?.title}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {product?.title}
                                    <p className="flex items-center gap-2 text-[#b98e2f]">
                                        <FaBangladeshiTakaSign />
                                        2500 BDT
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    {product?.district} <br />{" "}
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
                                    <button className="btn btn-sm btn-success btn-soft">
                                        Complete
                                    </button>
                                    <button className="btn btn-sm btn-error btn-soft">
                                        Cancel
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
