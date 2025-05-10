import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CgArrowLeftO } from "react-icons/cg";
import { FiEdit } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { HiOutlineCurrencyDollar, HiOutlineViewGrid } from "react-icons/hi";
import { TbCoinTaka } from "react-icons/tb";

const MyAccount = () => {
    const { user, logout, setDbUser } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);

    console.log("Orders:", orders);

    useEffect(() => {
        fetch(`http://localhost:3000/orders/${user?.email}`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    }, []);

    const handleReview = (orderId) => {};

    return (
        <div className="w-[95%] md:container mx-auto my-10 grid gird-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Profile area */}
            <div>
                <div className="w-full h-[400px] shadow-lg rounded-lg p-4 border-t-16 border-[#b98e2f]">
                    <img
                        className="w-full h-full rounded"
                        src={
                            user?.photoURL
                                ? user.photoURL
                                : "https://i.ibb.co.com/0D15PXH/Whats-App-Image-2024-01-15-at-21-28-37-d3e60b3a.png"
                        }
                        alt=""
                    />
                </div>

                <div className="my-5 text-center shadow-lg rounded-lg p-4 py-6 bg-[#b98e2f] text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        {user?.displayName}
                    </h1>
                    <p className="mb-4">{user?.email}</p>
                    <div className="flex justify-center items-center gap-1">
                        <Link
                            to={"/shop"}
                            className="btn bg-white shadow-none border-none text-[#b98e2f]"
                        >
                            <FiEdit />
                            Edit Profile
                        </Link>
                        <button
                            onClick={() => {
                                logout()
                                    .then(() => {
                                        console.log("Logout successful");
                                        Swal.fire({
                                            title: "Success",
                                            text: "Logout successful",
                                            icon: "success",
                                            confirmButtonText: "Close",
                                        });
                                        setDbUser(null);
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "Logout error:",
                                            error.message
                                        );
                                        Swal.fire({
                                            title: "Error!",
                                            text: error.message,
                                            icon: "error",
                                            confirmButtonText: "Close",
                                        });
                                    });
                            }}
                            className="btn bg-white text-[#b98e2f] border-none shadow-none"
                        >
                            <CgArrowLeftO />
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            {/* Profile area end */}

            {/* Action area */}
            <div className="col-span-1 md:col-span-2">
                {/* My Orders */}
                <div className="border p-2 border-warning rounded">
                    <h1 className="flex items-center gap-2 text-white text-2xl font-bold bg-[#b98e2f] p-2 rounded">
                        <HiOutlineViewGrid />
                        My Orders
                    </h1>
                    <div>
                        {orders?.map((order, index) => (
                            <div className="my-2 md:my-4">
                                <div className="bg-[#b98e2f] text-white rounded-t p-1 flex justify-between items-center">
                                    <h1 className="text-lg font-semibold flex items-center gap-2">
                                        {index + 1}. Order ID: #{order?._id}
                                        <TbCoinTaka /> {order?.totalPrice} BDT
                                    </h1>
                                    <button className="btn btn-sm btn-info btn-soft">
                                        View Details
                                    </button>
                                </div>
                                <table className="rounded-b min-w-full bg-white shadow-md overflow-hidden">
                                    <thead className="bg-gray-100">
                                        <tr className="text-left text-sm font-semibold text-gray-600">
                                            <th className="px-6 py-3">Image</th>
                                            <th className="px-6 py-3">Title</th>
                                            <th className="px-6 py-3">
                                                Order Time
                                            </th>
                                            <th className="px-6 py-3">
                                                Status
                                            </th>
                                            <th className="px-6 py-3">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.orderedProducts?.map(
                                            (product) => (
                                                <tr className="border-t border-gray-200">
                                                    <td className="px-6 py-4">
                                                        <img
                                                            src={
                                                                product?.images
                                                            }
                                                            alt={""}
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
                                                        {order?.orderDate}
                                                    </td>
                                                    <td
                                                        className={`px-6 py-4 ${
                                                            order?.status ===
                                                            "pending"
                                                                ? "text-yellow-500"
                                                                : order?.status ===
                                                                  "completed"
                                                                ? "text-green-500"
                                                                : "text-red-500"
                                                        }`}
                                                    >
                                                        {order?.status}
                                                    </td>
                                                    <td
                                                        className={`px-6 py-4 flex gap-2`}
                                                    >
                                                        <button
                                                            className={`btn btn-sm btn-soft ${
                                                                order?.status ===
                                                                    "pending" ||
                                                                order?.status ===
                                                                    "cancelled"
                                                                    ? "pointer-events-none btn-error"
                                                                    : "btn-success"
                                                            }`}
                                                        >
                                                            Make Review
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </div>
                {/* My orders end */}

                <div className="mt-5 border p-2 border-warning rounded">
                    <h1 className="text-white text-2xl font-bold bg-[#b98e2f] p-2 rounded flex items-center gap-2">
                        <HiOutlineCurrencyDollar />
                        Payment History
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Product Title</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Transaction ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr>
                                    <th>1</th>
                                    <td>Cy Ganderton</td>
                                    <td>1200</td>
                                    <td>20/02/2025</td>
                                    <td>1f23BCf4Rf4ffD4dHgd</td>
                                    <td>
                                        <span className="btn btn-soft btn-success btn-xs cursor-none">
                                            success
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>Cy Ganderton</td>
                                    <td>1200</td>
                                    <td>20/02/2025</td>
                                    <td>1f23BCf4Rf4ffD4dHgd</td>
                                    <td>
                                        <span className="btn btn-soft btn-error btn-xs cursor-none">
                                            failed
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Action area end */}
        </div>
    );
};

export default MyAccount;
