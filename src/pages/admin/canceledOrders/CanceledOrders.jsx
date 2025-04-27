import { BsClockHistory } from "react-icons/bs";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const CanceledOrders = () => {
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
                <FaRegCircleCheck className="text-info" />
                Completed Orders
            </h2>
            <div className="overflow-x-auto border border-gray-200">
                <table className="min-w-full bg-white shadow-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">District</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Amount</th>
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
                                </td>
                                <td className="px-6 py-4">{order?.district}</td>
                                <td className="px-6 py-4">Completed</td>
                                <td className="px-6 py-4">2500</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button className="btn btn-info btn-soft btn-sm">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4">
                <Link className="btn btn-soft btn-success">
                    Go To Sales Page
                    <FaRegArrowAltCircleRight />
                </Link>
                <Link className="btn btn-soft btn-info">
                    <IoChevronBackCircleOutline />
                    Back To Admin Home
                </Link>
                <Link className="btn btn-soft btn-error">
                    Pending Orders
                    <BsClockHistory />
                </Link>
            </div>
        </div>
    );
};

export default CanceledOrders;
