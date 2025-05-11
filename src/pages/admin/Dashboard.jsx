import { useContext } from "react";
import {
    IoCheckmarkDoneCircleOutline,
    IoChevronBackCircleOutline,
} from "react-icons/io5";
import { LuClock } from "react-icons/lu";
import { MdOutlineAddBox, MdOutlineCancel } from "react-icons/md";
import { RiApps2AddLine } from "react-icons/ri";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket, FaCubesStacked } from "react-icons/fa6";
import { FiHome, FiUsers } from "react-icons/fi";
import { AiOutlineLogout, AiOutlineProduct } from "react-icons/ai";
import { BsCoin } from "react-icons/bs";
import { FaBlog } from "react-icons/fa";
import { TbLayoutDashboard } from "react-icons/tb";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";

const Dashboard = () => {
    const { user, logout, setDbUser } = useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label
                    htmlFor="my-drawer-2"
                    className="btn bg-[#f3f4f6] text-black drawer-button lg:hidden border-none w-full"
                >
                    <FaArrowRightFromBracket
                        className="bg-white p-2 w-10 h-10 rounded-full mt-4 border border-info text-info"
                        size={21}
                    />
                </label>

                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <div className="flex flex-col h-full p-3 w-60 dark:bg-gray-50 dark:text-gray-800">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <h2 className="flex items-center gap-2 text-2xl font-bold w-full p-2 rounded text-info">
                                    <TbLayoutDashboard />
                                    Dashboard
                                </h2>
                            </div>
                            <div className="flex-1">
                                <ul className="pt-2 pb-4 space-y-1 text-sm">
                                    <li className="rounded-sm">
                                        <Link
                                            to={"/admin/dashboard"}
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <FiHome className="text-info" />
                                            <span>Home</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm">
                                        <Link
                                            to={
                                                "/admin/dashboard/pendingOrders"
                                            }
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <LuClock className="text-error" />
                                            <span>Pending Orders</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm">
                                        <Link
                                            to={
                                                "/admin/dashboard/completedOrders"
                                            }
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <IoCheckmarkDoneCircleOutline className="text-success" />
                                            <span>Completed Orders</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm">
                                        <Link
                                            to={
                                                "/admin/dashboard/canceledOrders"
                                            }
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <MdOutlineCancel className="text-error" />
                                            <span>Canceled Orders</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm">
                                        <Link
                                            to={"/admin/dashboard/allProducts"}
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <FaCubesStacked className="text-warning" />
                                            <span>All Product</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm">
                                        <Link
                                            to={"/admin/dashboard/addProduct"}
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <RiApps2AddLine className="text-info" />
                                            <span>Add Product</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm">
                                        <Link
                                            to={"/admin/dashboard/sellDetails"}
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <BsCoin className="text-success" />
                                            <span>Sell Details</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm">
                                        <Link
                                            to={"/admin/dashboard/users"}
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <FiUsers className="text-error" />
                                            <span>Users</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm">
                                        <Link
                                            to={"/admin/dashboard/blogs"}
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <FaBlog className="text-info" />
                                            <span>Blogs</span>
                                        </Link>
                                    </li>
                                    <li className="rounded-sm">
                                        <Link
                                            to={"/admin/dashboard/addBlog"}
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <MdOutlineAddBox className="text-success" />
                                            <span>Add Blog</span>
                                        </Link>
                                    </li>
                                    <li
                                        onClick={() => {
                                            logout()
                                                .then(() => {
                                                    Swal.fire({
                                                        title: "Success",
                                                        text: "Logout successful",
                                                        icon: "success",
                                                        toast: true,
                                                        position: "top-end",
                                                        showConfirmButton: false,
                                                        timer: 1500,
                                                    });
                                                    setDbUser(null);
                                                    navigate("/login");
                                                    window.location.reload();
                                                })
                                                .catch((error) => {
                                                    console.error(
                                                        "Logout error:",
                                                        error.message
                                                    );
                                                });
                                        }}
                                        className="rounded-sm"
                                    >
                                        <a
                                            rel="noopener noreferrer"
                                            href="#"
                                            className="flex items-center p-2 space-x-3 rounded-md"
                                        >
                                            <AiOutlineLogout className="text-error" />
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex items-center p-2 mt-2 space-x-4 justify-self-end">
                            <img
                                src={
                                    user?.photoURL
                                        ? user?.photoURL
                                        : "https://cdn-icons-png.flaticon.com/128/8030/8030198.png"
                                }
                                alt=""
                                className="w-12 h-12 rounded-lg dark:bg-gray-500"
                            />
                            <div>
                                <h2 className="text-lg font-semibold">
                                    {user?.displayName}
                                </h2>
                                <span className="flex items-center space-x-1">
                                    <Link
                                        to={"/admin/dashboard/profile"}
                                        rel="noopener noreferrer"
                                        className="text-xs hover:underline dark:text-gray-600"
                                    >
                                        View profile
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <li className="rounded-sm mt-5">
                            <Link
                                to={"/"}
                                rel="noopener noreferrer"
                                href="#"
                                className="flex items-center btn btn-sm border-error border-dashed text-error"
                            >
                                <IoChevronBackCircleOutline />
                                <span>Back to Home</span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
