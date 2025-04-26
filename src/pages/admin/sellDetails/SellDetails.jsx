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
            <h1 className="text-3xl font-bold mb-8 text-gray-700">
                Sell Details Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Total Sales
                        </h2>
                        <p className="text-2xl font-bold text-success">
                            {sellData?.totalSales} BDT
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Cancelled Orders Amount
                        </h2>
                        <p className="text-2xl font-bold text-error">
                            {sellData?.cancelledOrdersAmount} BDT
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Pending Orders Amount
                        </h2>
                        <p className="text-2xl font-bold text-info">
                            {sellData?.cancelledOrdersAmount} BDT
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Total Orders
                        </h2>
                        <p className="text-2xl font-bold text-success">
                            {sellData?.cancelledOrdersAmount} BDT
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Cancelled Orders
                        </h2>
                        <p className="text-2xl font-bold text-error">
                            {sellData?.cancelledOrdersAmount} BDT
                        </p>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">
                            Pending Orders
                        </h2>
                        <p className="text-2xl font-bold text-info">
                            {sellData?.cancelledOrdersAmount} BDT
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellDetails;
