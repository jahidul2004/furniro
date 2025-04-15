import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

// Custom Card Component
const Card = ({ title, value, color }) => (
    <div className="bg-white rounded-2xl shadow p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
);

const AdminHome = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const data = [
        { name: "Jan", users: 400 },
        { name: "Feb", users: 700 },
        { name: "Mar", users: 650 },
        { name: "Apr", users: 900 },
        { name: "May", users: 850 },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex flex-col md:flex-row items-center justify-between">
                {/* Welcome Message */}
                <h1 className="text-center md:text-left text-4xl font-bold mb-4 text-gray-800">
                    Welcome to Admin Dashboard
                </h1>

                {/* Real-time Clock */}
                <p className="text-lg text-gray-700 bg-white w-max p-4 rounded-full font-medium mb-6">
                    🕒 {time.toLocaleTimeString()}
                </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card title="Total Users" value="1,235" color="text-blue-600" />
                <Card
                    title="Total Sales"
                    value="$4,560"
                    color="text-green-600"
                />
                <Card title="New Signups" value="128" color="text-purple-600" />
                <Card title="Pending Orders" value="35" color="text-red-600" />
            </div>

            {/* User Growth Chart */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    📈 Product Sale Overview
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="users"
                            stroke="#3b82f6"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminHome;
