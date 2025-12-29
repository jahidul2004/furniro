import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaRegClock,
    FaUserFriends,
    FaBoxOpen,
    FaShoppingCart,
    FaStar,
    FaArrowRight,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import AuthContext from "../../../context/AuthContext/AuthContext";

const StatCard = ({ title, value, icon, color, bg }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 flex items-center justify-between">
        <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
            <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
        </div>
        <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${bg} ${color}`}
        >
            {icon}
        </div>
    </div>
);

const AdminHome = () => {
    const [time, setTime] = useState(new Date());
    const [documentCount, setDocumentCount] = useState({
        userCount: 0,
        productCount: 0,
        orderCount: 0,
        reviewCount: 0,
    });
    const { user } = useContext(AuthContext);
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        fetch("https://furniro-server-bay.vercel.app/documentCount")
            .then((res) => res.json())
            .then((data) => {
                setDocumentCount(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);

        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        return () => clearInterval(timer);
    }, []);

    const salesData = [
        { name: "Jan", sales: 4000, orders: 240 },
        { name: "Feb", sales: 3000, orders: 139 },
        { name: "Mar", sales: 2000, orders: 980 },
        { name: "Apr", sales: 2780, orders: 390 },
        { name: "May", sales: 1890, orders: 480 },
        { name: "Jun", sales: 2390, orders: 380 },
        { name: "Jul", sales: 3490, orders: 430 },
    ];

    const pieData = [
        { name: "Living Room", value: 400 },
        { name: "Bedroom", value: 300 },
        { name: "Dining", value: 300 },
        { name: "Office", value: 200 },
    ];
    const COLORS = ["#b98e2f", "#FFBB28", "#FF8042", "#0088FE"];

    return (
        <div className="p-6 md:p-10 bg-[#f4f5f7] min-h-screen font-sans">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                        {greeting}, {user?.displayName?.split(" ")[0]}! 👋
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Here is what’s happening with your store today.
                    </p>
                </div>

                <div className="bg-white px-5 py-2 rounded-full shadow-sm flex items-center gap-3 text-gray-600 font-medium text-sm border border-gray-200">
                    <FaRegClock className="text-[#b98e2f]" />
                    {time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Users"
                    value={documentCount?.userCount || 0}
                    icon={<FaUserFriends />}
                    color="text-blue-600"
                    bg="bg-blue-50"
                />
                <StatCard
                    title="Total Products"
                    value={documentCount?.productCount || 0}
                    icon={<FaBoxOpen />}
                    color="text-[#b98e2f]"
                    bg="bg-[#b98e2f]/10"
                />
                <StatCard
                    title="Total Orders"
                    value={documentCount?.orderCount || 0}
                    icon={<FaShoppingCart />}
                    color="text-purple-600"
                    bg="bg-purple-50"
                />
                <StatCard
                    title="Total Reviews"
                    value={documentCount?.reviewCount || 0}
                    icon={<FaStar />}
                    color="text-orange-500"
                    bg="bg-orange-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                            <MdDashboard className="text-[#b98e2f]" /> Sales
                            Analytics
                        </h2>
                        <select className="select select-bordered select-xs w-max max-w-xs">
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                data={salesData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="colorSales"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#b98e2f"
                                            stopOpacity={0.8}
                                        />
                                        <stop
                                            offset="95%"
                                            stopColor="#b98e2f"
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    opacity={0.3}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "#fff",
                                        borderRadius: "10px",
                                        border: "none",
                                        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#b98e2f"
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">
                        Category Sales
                    </h2>
                    <div className="h-[300px] w-full flex justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
