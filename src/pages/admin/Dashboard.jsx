import { useContext } from "react";
import {
    IoCheckmarkDoneCircleOutline,
    IoChevronBackCircleOutline,
} from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { MdOutlineAddBox, MdOutlineCancel, MdDashboard } from "react-icons/md";
import { RiApps2AddLine } from "react-icons/ri";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
    FaBars,
    FaCubes,
    FaUserFriends,
    FaBlog,
    FaSignOutAlt,
} from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import logo from "../../assets/logo/logo.png"; // Assuming you have logo

const Dashboard = () => {
    const { user, logout, setDbUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    title: "Logged Out",
                    text: "You have been logged out successfully",
                    icon: "success",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    iconColor: "#b98e2f",
                });
                setDbUser(null);
                navigate("/login");
            })
            .catch((error) => {
                console.error("Logout error:", error.message);
            });
    };

    const sidebarLinks = [
        { path: "/admin/dashboard", title: "Overview", icon: <MdDashboard /> },
        {
            path: "/admin/dashboard/pendingOrders",
            title: "Pending Orders",
            icon: <LuClock />,
        },
        {
            path: "/admin/dashboard/completedOrders",
            title: "Completed Orders",
            icon: <IoCheckmarkDoneCircleOutline />,
        },
        {
            path: "/admin/dashboard/canceledOrders",
            title: "Canceled Orders",
            icon: <MdOutlineCancel />,
        },
        {
            path: "/admin/dashboard/allProducts",
            title: "All Products",
            icon: <FaCubes />,
        },
        {
            path: "/admin/dashboard/addProduct",
            title: "Add Product",
            icon: <RiApps2AddLine />,
        },
        {
            path: "/admin/dashboard/sellDetails",
            title: "Sales Report",
            icon: <BsGraphUpArrow />,
        },
        {
            path: "/admin/dashboard/users",
            title: "Users",
            icon: <FaUserFriends />,
        },
        {
            path: "/admin/dashboard/blogs",
            title: "All Blogs",
            icon: <FaBlog />,
        },
        {
            path: "/admin/dashboard/addBlog",
            title: "Add Blog",
            icon: <MdOutlineAddBox />,
        },
    ];

    return (
        <div className="drawer lg:drawer-open bg-gray-50 min-h-screen font-sans">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

            {/* Main Content */}
            <div className="drawer-content flex flex-col">
                {/* Mobile Header */}
                <div className="w-full lg:hidden flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-20">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Furniro" className="w-8" />
                        <span className="font-bold text-xl text-gray-800">
                            Furniro Admin
                        </span>
                    </div>
                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-ghost btn-circle drawer-button"
                    >
                        <FaBars size={24} className="text-[#b98e2f]" />
                    </label>
                </div>

                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-30">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <div className="menu bg-white text-base-content min-h-full w-72 p-0 flex flex-col border-r border-gray-100 shadow-xl lg:shadow-none">
                    {/* Sidebar Header */}
                    <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                        <img src={logo} alt="Furniro" className="w-10" />
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Furniro
                            </h1>
                            <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
                                Admin Panel
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <ul className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                        <li className="menu-title text-xs font-bold text-gray-400 uppercase mb-2">
                            Main Menu
                        </li>
                        {sidebarLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    end={link.path === "/admin/dashboard"}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "bg-[#b98e2f] text-white shadow-md shadow-[#b98e2f]/30"
                                                : "text-gray-600 hover:bg-[#b98e2f]/10 hover:text-[#b98e2f]"
                                        }`
                                    }
                                >
                                    <span className="text-lg">{link.icon}</span>
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* User Profile & Logout */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                            <img
                                src={
                                    user?.photoURL ||
                                    "https://cdn-icons-png.flaticon.com/128/8030/8030198.png"
                                }
                                alt="Admin"
                                className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            />
                            <div className="overflow-hidden">
                                <h4 className="font-bold text-gray-800 text-sm truncate">
                                    {user?.displayName}
                                </h4>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <Link
                                to="/"
                                className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <IoChevronBackCircleOutline /> Home
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-bold text-red-500 bg-red-50 border border-red-100 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
