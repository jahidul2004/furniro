import { BsClockHistory } from "react-icons/bs";
import { CgSandClock } from "react-icons/cg";
import { FaUsers } from "react-icons/fa6";
import { HiOutlineViewGrid } from "react-icons/hi";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { TbCoinTaka, TbListDetails } from "react-icons/tb";
import { VscError } from "react-icons/vsc";
import { Link } from "react-router-dom";

const SellDetails = () => {
    const sellData = {
        totalSales: 150000,
        cancelledOrdersAmount: 10000,
        pendingOrdersAmount: 5000,
        totalOrders: 120,
        completedOrders: 100,
        cancelledOrders: 10,
        pendingOrders: 10,
    };

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
                    <TbCoinTaka
                        size={32}
                        className="mx-auto mb-2 text-success"
                    />

                    <p className="text-2xl font-bold text-success">
                        {sellData?.totalSales} BDT
                    </p>
                    <h2 className="text-xl font-semibold mb-4">Total Sales</h2>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <MdOutlineCancelPresentation
                        size={32}
                        className="mx-auto mb-2 text-error"
                    />

                    <p className="text-2xl font-bold text-error">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                    <h2 className="text-xl font-semibold mb-4">
                        Cancelled Orders Amount
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <CgSandClock size={32} className="mx-auto mb-2 text-info" />

                    <p className="text-2xl font-bold text-info">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                    <h2 className="text-xl font-semibold mb-4">
                        Pending Orders Amount
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <HiOutlineViewGrid
                        size={32}
                        className="mx-auto mb-2 text-success"
                    />

                    <p className="text-2xl font-bold text-success">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                    <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <VscError size={32} className="mx-auto mb-2 text-error" />
                    <p className="text-2xl font-bold text-error">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                    <h2 className="text-xl font-semibold mb-4">
                        Cancelled Orders
                    </h2>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <BsClockHistory
                        size={32}
                        className="mx-auto mb-2 text-info"
                    />

                    <p className="text-2xl font-bold text-info">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                    <h2 className="text-xl font-semibold mb-4">
                        Pending Orders
                    </h2>
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
