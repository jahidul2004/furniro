import { useEffect, useState } from "react";
import { BsClockHistory } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { TbCoinTaka, TbListDetails } from "react-icons/tb";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";

const SellDetails = () => {
    const [sellData, setSellData] = useState([]);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [cancelledOrders, setCancelledOrders] = useState(0);

    const [pendingAmount, setPendingAmount] = useState(0);
    const [completedAmount, setCompletedAmount] = useState(0);
    const [cancelledAmount, setCancelledAmount] = useState(0);

    useEffect(() => {
        fetch("http://localhost:3000/orderAmountStats")
            .then((res) => res.json())
            .then((data) => {
                setSellData(data);
                data?.map((item) => {
                    if (item._id === "pending") {
                        setPendingAmount(item?.totalAmount);
                    } else if (item._id === "completed") {
                        setCompletedAmount(item?.totalAmount);
                    } else {
                        setCancelledAmount(item?.totalAmount);
                    }
                });
            });
    });

    useEffect(() => {
        fetch("http://localhost:3000/orderStats")
            .then((res) => res.json())
            .then((data) => {
                data?.map((item) => {
                    if (item._id === "pending") {
                        setPendingOrders(item?.count);
                    } else if (item._id === "completed") {
                        setCompletedOrders(item?.count);
                    } else {
                        setCancelledOrders(item?.count);
                    }
                });
            });
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
                <TbListDetails
                    size={30}
                    className="text-info border border-dashed rounded-full p-1"
                />
                Sell Details Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                {/* Total Sales Card */}
                <div className="text-left bg-white p-6 rounded-xl shadow-lg border-l-4 border-success hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-medium text-gray-600">
                                Total Sales
                            </h2>
                            <p className="text-3xl font-bold text-success mt-2">
                                {completedAmount} BDT
                            </p>
                        </div>
                        <div className="bg-success/10 p-3 rounded-full">
                            <svg
                                className="w-6 h-6 text-success"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/admin/dashboard/completedOrders"
                            className="text-success font-medium flex items-center hover:underline"
                        >
                            View details
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Cancelled Orders Amount Card */}
                <div className="text-left bg-white p-6 rounded-xl shadow-lg border-l-4 border-error hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-medium text-gray-600">
                                Cancelled Orders Amount
                            </h2>
                            <p className="text-3xl font-bold text-error mt-2">
                                {cancelledAmount} BDT
                            </p>
                        </div>
                        <div className="bg-error/10 p-3 rounded-full">
                            <svg
                                className="w-6 h-6 text-error"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/admin/dashboard/canceledOrders"
                            className="text-error font-medium flex items-center hover:underline"
                        >
                            View details
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Pending Orders Amount Card */}
                <div className="text-left bg-white p-6 rounded-xl shadow-lg border-l-4 border-info hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-medium text-gray-600">
                                Pending Orders Amount
                            </h2>
                            <p className="text-3xl font-bold text-info mt-2">
                                {pendingAmount} BDT
                            </p>
                        </div>
                        <div className="bg-info/10 p-3 rounded-full">
                            <svg
                                className="w-6 h-6 text-info"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/admin/dashboard/pendingOrders"
                            className="text-info font-medium flex items-center hover:underline"
                        >
                            View details
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Completed Orders Card */}
                <div className="text-left bg-white p-6 rounded-xl shadow-lg border-l-4 border-success hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-medium text-gray-600">
                                Completed Orders
                            </h2>
                            <p className="text-3xl font-bold text-success mt-2">
                                {completedOrders}
                            </p>
                        </div>
                        <div className="bg-success/10 p-3 rounded-full">
                            <svg
                                className="w-6 h-6 text-success"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/admin/dashboard/completedOrders"
                            className="text-success font-medium flex items-center hover:underline"
                        >
                            View details
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Cancelled Orders Card */}
                <div className="text-left bg-white p-6 rounded-xl shadow-lg border-l-4 border-error hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-medium text-gray-600">
                                Cancelled Orders
                            </h2>
                            <p className="text-3xl font-bold text-error mt-2">
                                {cancelledOrders}
                            </p>
                        </div>
                        <div className="bg-error/10 p-3 rounded-full">
                            <svg
                                className="w-6 h-6 text-error"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/admin/dashboard/canceledOrders"
                            className="text-error font-medium flex items-center hover:underline"
                        >
                            View details
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* Pending Orders Card */}
                <div className="text-left bg-white p-6 rounded-xl shadow-lg border-l-4 border-info hover:shadow-xl transition-shadow duration-300">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-lg font-medium text-gray-600">
                                Pending Orders
                            </h2>
                            <p className="text-3xl font-bold text-info mt-2">
                                {pendingOrders}
                            </p>
                        </div>
                        <div className="bg-info/10 p-3 rounded-full">
                            <svg
                                className="w-6 h-6 text-info"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/admin/dashboard/pendingOrders"
                            className="text-info font-medium flex items-center hover:underline"
                        >
                            View details
                            <svg
                                className="w-4 h-4 ml-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <Link
                    to={"/admin/dashboard"}
                    className="btn btn-dash btn-error"
                >
                    <IoArrowBackCircleOutline />
                    Back To Admin Home
                </Link>
            </div>
        </div>
    );
};

export default SellDetails;
