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
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-2xl font-bold text-success">
                        {sellData?.totalSales} BDT
                    </p>
                    <h2 className="text-xl font-semibold mb-4">Total Sales</h2>
                    <Link
                        to={"/admin/dashboard/completedOrders"}
                        className="btn btn-sm btn-success btn-soft"
                    >
                        View
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-2xl font-bold text-error">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                    <h2 className="text-xl font-semibold mb-4">
                        Cancelled Orders Amount
                    </h2>
                    <Link
                        to={"/admin/dashboard/completedOrders"}
                        className="btn btn-sm btn-error btn-soft"
                    >
                        View
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-2xl font-bold text-info">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                    <h2 className="text-xl font-semibold mb-4">
                        Pending Orders Amount
                    </h2>
                    <Link
                        to={"/admin/dashboard/completedOrders"}
                        className="btn btn-sm btn-info btn-soft"
                    >
                        View
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-2xl font-bold text-success">
                        {completedOrders}
                    </p>
                    <h2 className="text-xl font-semibold mb-4">
                        Completed Orders
                    </h2>
                    <Link
                        to={"/admin/dashboard/completedOrders"}
                        className="btn btn-sm btn-success btn-soft"
                    >
                        View
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-2xl font-bold text-error">
                        {cancelledOrders}
                    </p>
                    <h2 className="text-xl font-semibold mb-4">
                        Cancelled Orders
                    </h2>
                    <Link
                        to={"/admin/dashboard/completedOrders"}
                        className="btn btn-sm btn-error btn-soft"
                    >
                        View
                    </Link>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <p className="text-2xl font-bold text-info">
                        {pendingOrders}
                    </p>
                    <h2 className="text-xl font-semibold mb-4">
                        Pending Orders
                    </h2>
                    <Link
                        to={"/admin/dashboard/completedOrders"}
                        className="btn btn-sm btn-info btn-soft"
                    >
                        View
                    </Link>
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
