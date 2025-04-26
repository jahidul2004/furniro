const CompletedOrders = () => {
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
            <h2 className="text-2xl font-bold mb-6">Completed Orders</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
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
                            <tr key={order?.id} className="border-t">
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
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
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

export default CompletedOrders;
