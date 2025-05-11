import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BsEmojiSmile } from "react-icons/bs";
import { FaRegArrowAltCircleRight, FaRegClock } from "react-icons/fa";
import { MdOutlineAnalytics } from "react-icons/md";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import AuthContext from "../../../context/AuthContext/AuthContext";

// Custom Card Component
const Card = ({ title, value, color }) => (
    <div className="bg-white rounded-2xl shadow p-4">
        <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
        <h3 className="text-lg font-semibold">{title}</h3>
    </div>
);

const AdminHome = () => {
    const [time, setTime] = useState(new Date());
    const [documentCount, setDocumentCount] = useState([]);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        fetch("https://furniro-server-bay.vercel.app/documentCount")
            .then((res) => res.json())
            .then((data) => {
                setDocumentCount(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    });

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
                <h1 className="flex items-center gap-2 text-center md:text-left text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                    <BsEmojiSmile className="text-info" />
                    Welcome, {user?.displayName}
                </h1>

                {/* Real-time Clock */}
                <p className="border border-dashed border-info text-lg text-info bg-white w-max px-4 py-2 rounded-full font-medium mb-6 flex items-center gap-2">
                    <FaRegClock />
                    {time.toLocaleTimeString()}
                </p>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-center">
                <Card
                    title="Total Users"
                    value={documentCount?.userCount}
                    color="text-blue-600"
                />
                <Card
                    title="Total Products"
                    value={documentCount?.productCount}
                    color="text-green-600"
                />
                <Card
                    title="Total Order"
                    value={documentCount?.orderCount}
                    color="text-purple-600"
                />
                <Card
                    title="Total Review"
                    value={documentCount?.reviewCount}
                    color="text-red-600"
                />
            </div>

            {/* User Growth Chart */}
            <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <MdOutlineAnalytics className="text-info" /> Product Sale
                    Overview (Fixed Data)
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

            <div className="flex justify-center items-center mt-5">
                <Link
                    to={"sellDetails"}
                    className="btn btn-info text-white rounded-full"
                >
                    Go to sales page
                    <FaRegArrowAltCircleRight />
                </Link>
            </div>
        </div>
    );
};

export default AdminHome;
