import { CgSandClock } from "react-icons/cg";
import { FaBlog, FaRegUserCircle } from "react-icons/fa";
import { TbCoinTaka } from "react-icons/tb";

const AdminBlog = () => {
    const orders = [
        {
            id: 1,
            image: "https://i.ibb.co.com/qFWn8JfB/furniture-styles-Getty-Images-1467984982-512fed4077b646eabbc187619554d517.jpg",
            title: "Modern Wooden Chair",
            district: "Dhaka",
            status: "pending",
        },
        {
            id: 2,
            image: "https://i.ibb.co.com/vCsPjzkX/images.jpg",
            title: "Elegant Sofa Set",
            district: "Chittagong",
            status: "completed",
        },
        {
            id: 3,
            image: "https://i.ibb.co.com/Xr5MCRyN/hero1.jpg",
            title: "Glass Coffee Table",
            district: "Comilla",
            status: "cancelled",
        },
    ];
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaBlog size={28} className="text-info" />
                Blogs
            </h2>
            <div className="overflow-x-auto border border-gray-200">
                <table className="min-w-full bg-white shadow-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Blog Title</th>
                            <th className="px-6 py-3">Added Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr
                                key={order?.id}
                                className="border-t border-gray-200"
                            >
                                <td className="px-6 py-4">
                                    <img
                                        src={order?.image}
                                        alt={order?.title}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {order?.title}
                                    <br />
                                    <span className="flex items-center gap-1 text-info">
                                        <FaRegUserCircle />
                                        Abdul Ahad
                                    </span>
                                </td>
                                <td className="px-6 py-4">20/5/2024</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button className="btn btn-sm btn-error btn-soft border border-dashed border-error">
                                        Delete
                                    </button>
                                    <button className="btn btn-sm btn-info btn-soft border border-dashed border-info">
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

export default AdminBlog;
