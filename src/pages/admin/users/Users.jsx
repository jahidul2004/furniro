import { useEffect, useState } from "react";
import { TbUsers } from "react-icons/tb";
import { FaSearch, FaTrashAlt, FaUserShield, FaUser } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://furniro-server-bay.vercel.app/allUsers")
            .then((res) => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredUsers = users.filter(
        (user) =>
            user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Helper to format date
    const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#b98e2f]"></span>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <TbUsers className="text-[#b98e2f]" />
                        User Management
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Total Registered Users: {users.length}
                    </p>
                </div>

                <div className="relative w-full md:w-96">
                    <input
                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-[#b98e2f] focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all shadow-sm"
                        type="text"
                        placeholder="Search by Name or Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">User Profile</th>
                                <th className="px-6 py-4">Email Address</th>
                                <th className="px-6 py-4">Registered Date</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers?.length > 0 ? (
                                filteredUsers.map((user, index) => (
                                    <tr
                                        key={user?._id || index}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar Placeholder using Name Initials */}
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                                                        user?.role === "admin"
                                                            ? "bg-[#b98e2f]"
                                                            : "bg-gray-400"
                                                    }`}
                                                >
                                                    {user?.name
                                                        ?.charAt(0)
                                                        .toUpperCase() || "U"}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 text-sm">
                                                        {user?.name ||
                                                            "Unknown User"}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        ID: {index + 1}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <HiOutlineMail className="text-gray-400" />
                                                {user?.email}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                                {formatDate(user?.creationTime)}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            {user?.role === "admin" ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-purple-100 text-purple-700 border border-purple-200">
                                                    <FaUserShield /> Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-100">
                                                    <FaUser /> User
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <button
                                                className="p-2 rounded bg-red-50 text-red-400 cursor-not-allowed opacity-60"
                                                title="Remove User (Disabled)"
                                                disabled
                                            >
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="text-center py-10"
                                    >
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <TbUsers
                                                size={48}
                                                className="mb-2 opacity-50"
                                            />
                                            <p className="text-lg font-medium">
                                                No users found
                                            </p>
                                            <p className="text-sm">
                                                Try searching with a different
                                                name or email.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-4 text-right text-xs text-gray-400">
                Showing {filteredUsers.length} users
            </div>
        </div>
    );
};

export default Users;
