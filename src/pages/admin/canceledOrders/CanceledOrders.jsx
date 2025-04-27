import { BsClockHistory } from "react-icons/bs";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegCircleCheck } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
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
                <ImCancelCircle className="text-error" />
                Canceled Orders
            </h2>
            <div className="overflow-x-auto border border-gray-200">
                <table className="min-w-full bg-white shadow-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Title</th>
                            <th className="px-6 py-3">Ordered By</th>
                            <th className="px-6 py-3">Canceled By</th>
                            <th className="px-6 py-3">Status</th>
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
                                        className="w-14 h-14 object-cover rounded border border-dashed border-error p-1"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {order?.title} <br />{" "}
                                    <span className="text-error">2500 BDT</span>
                                </td>
                                <td className="px-6 py-4">
                                    Jerin Akter <br />{" "}
                                    <span className="text-sm text-success font-semibold">
                                        01787653268
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    Jerin Akter <br />{" "}
                                    <span className="text-sm text-error font-semibold">
                                        20/12/2025
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="bg-[#fff4f1] p-1 rounded text-error font-semibold text-sm">
                                        Canceled
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button className="btn btn-info btn-soft btn-sm">
                                        View Details
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
