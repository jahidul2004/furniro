import { useEffect, useState } from "react";
import {
    HiOutlineCurrencyBangladeshi,
    HiOutlineShoppingBag,
} from "react-icons/hi";
import { MdOutlineCancel, MdPendingActions, MdArrowBack } from "react-icons/md";
import { TbListDetails, TbCoinTaka } from "react-icons/tb";
import { FaCheckCircle, FaChartLine } from "react-icons/fa";
import { Link } from "react-router-dom";

const SellDetails = () => {
    const [sellData, setSellData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Counts
    const [pendingOrders, setPendingOrders] = useState(0);
    const [completedOrders, setCompletedOrders] = useState(0);
    const [cancelledOrders, setCancelledOrders] = useState(0);

    // Amounts
    const [pendingAmount, setPendingAmount] = useState(0);
    const [completedAmount, setCompletedAmount] = useState(0);
    const [cancelledAmount, setCancelledAmount] = useState(0);

    useEffect(() => {
        setLoading(true);
        // Fetch Amounts
        fetch("https://furniro-server-bay.vercel.app/orderAmountStats")
            .then((res) => res.json())
            .then((data) => {
                setSellData(data);
                data?.map((item) => {
                    if (item._id === "pending")
                        setPendingAmount(item?.totalAmount);
                    else if (item._id === "completed")
                        setCompletedAmount(item?.totalAmount);
                    else setCancelledAmount(item?.totalAmount);
                });
            });

        // Fetch Counts
        fetch("https://furniro-server-bay.vercel.app/orderStats")
            .then((res) => res.json())
            .then((data) => {
                data?.map((item) => {
                    if (item._id === "pending") setPendingOrders(item?.count);
                    else if (item._id === "completed")
                        setCompletedOrders(item?.count);
                    else setCancelledOrders(item?.count);
                });
                setLoading(false);
            });
    }, []);

    // Reusable Card Component
    const DetailCard = ({
        title,
        amount,
        count,
        icon,
        colorClass,
        bgClass,
        link,
        linkText,
    }) => (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div
                className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500`}
            >
                {icon}
            </div>

            <div className="relative z-10">
                <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${bgClass} ${colorClass}`}
                >
                    {icon}
                </div>

                <h3 className="text-gray-500 font-medium text-sm uppercase tracking-wide">
                    {title}
                </h3>

                <div className="mt-2">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-800">
                            {typeof amount === "number"
                                ? amount.toLocaleString()
                                : amount}
                            {typeof amount === "number" && (
                                <span className="text-sm font-normal text-gray-500 ml-1">
                                    BDT
                                </span>
                            )}
                        </span>
                    </div>
                    {count !== undefined && (
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                            <span className={`font-bold ${colorClass}`}>
                                {count}
                            </span>{" "}
                            orders count
                        </p>
                    )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100">
                    <Link
                        to={link}
                        className={`text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all ${colorClass}`}
                    >
                        {linkText} <MdArrowBack className="rotate-180" />
                    </Link>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#b98e2f]"></span>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <TbListDetails className="text-[#b98e2f]" />
                        Sales Overview
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm">
                        Detailed breakdown of your earnings and order status.
                    </p>
                </div>
                <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-sm"
                >
                    <MdArrowBack /> Back to Dashboard
                </Link>
            </div>

            {/* Financial Overview Section */}
            <div className="mb-10">
                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaChartLine className="text-[#b98e2f]" /> Financial
                    Performance
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Revenue */}
                    <DetailCard
                        title="Total Revenue (Completed)"
                        amount={completedAmount}
                        count={completedOrders}
                        icon={<TbCoinTaka size={28} />}
                        colorClass="text-green-600"
                        bgClass="bg-green-100"
                        link="/admin/dashboard/completedOrders"
                        linkText="View Completed Orders"
                    />

                    {/* Pending Revenue */}
                    <DetailCard
                        title="Potential Revenue (Pending)"
                        amount={pendingAmount}
                        count={pendingOrders}
                        icon={<MdPendingActions size={28} />}
                        colorClass="text-yellow-600"
                        bgClass="bg-yellow-100"
                        link="/admin/dashboard/pendingOrders"
                        linkText="View Pending Orders"
                    />

                    {/* Lost Revenue */}
                    <DetailCard
                        title="Lost Revenue (Cancelled)"
                        amount={cancelledAmount}
                        count={cancelledOrders}
                        icon={<MdOutlineCancel size={28} />}
                        colorClass="text-red-600"
                        bgClass="bg-red-100"
                        link="/admin/dashboard/canceledOrders"
                        linkText="View Cancelled Orders"
                    />
                </div>
            </div>

            {/* Order Volume Section (Alternative View) */}
            <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <HiOutlineShoppingBag className="text-[#b98e2f]" /> Order
                    Volume Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">
                                Completed Orders
                            </p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">
                                {completedOrders}
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                            <FaCheckCircle size={20} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">
                                Pending Processing
                            </p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">
                                {pendingOrders}
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                            <MdPendingActions size={20} />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">
                                Cancelled / Returned
                            </p>
                            <h3 className="text-3xl font-bold text-gray-800 mt-1">
                                {cancelledOrders}
                            </h3>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                            <MdOutlineCancel size={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellDetails;
