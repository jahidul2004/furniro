import { IoArrowBackCircleOutline } from "react-icons/io5";
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
            <h1 className="text-2xl font-bold mb-8">Sell Details Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Total Sales</h2>
                    <p className="text-2xl font-bold text-success">
                        {sellData?.totalSales} BDT
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Cancelled Orders Amount
                    </h2>
                    <p className="text-2xl font-bold text-error">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Pending Orders Amount
                    </h2>
                    <p className="text-2xl font-bold text-info">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
                    <p className="text-2xl font-bold text-success">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Cancelled Orders
                    </h2>
                    <p className="text-2xl font-bold text-error">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Pending Orders
                    </h2>
                    <p className="text-2xl font-bold text-info">
                        {sellData?.cancelledOrdersAmount} BDT
                    </p>
                </div>
            </div>

            <div>
                <Link
                    to={"/admin/dashboard"}
                    className="btn btn-dash btn-error mt-5"
                >
                    <IoArrowBackCircleOutline />
                    Back To Admin Home
                </Link>
            </div>
        </div>
    );
};

export default SellDetails;
