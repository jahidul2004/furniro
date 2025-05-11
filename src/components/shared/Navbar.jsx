import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoCreateOutline, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { LuLayoutDashboard } from "react-icons/lu";
import { AiOutlineLogin } from "react-icons/ai";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { dbUser } = useContext(AuthContext);
    const links = (
        <>
            <li>
                <Link to={"/"}>Home</Link>
            </li>
            <li>
                <Link to={"/shop"}>Shop</Link>
            </li>
            <li>
                <Link to={"/about"}>About</Link>
            </li>
            <li>
                <Link to={"/contact"}>Contacts</Link>
            </li>
            <li>
                <Link to={"/blog"}>Blog</Link>
            </li>
            <li className="block md:hidden">
                <Link
                    className={`${
                        user && "hidden"
                    } btn btn-sm btn-soft btn-info w-full font-bold`}
                    to={"/login"}
                >
                    Login <AiOutlineLogin />
                </Link>
            </li>
            <li className={`${user && "hidden"} block md:hidden mt-2`}>
                <Link
                    className="btn btn-soft btn-success btn-sm w-full font-bold"
                    to={"/register"}
                >
                    Register <IoCreateOutline />
                </Link>
            </li>
            <li
                className={`block md:hidden ${!user && "hidden"} ${
                    dbUser?.role === "admin" && "hidden"
                }`}
            >
                <Link
                    to={"/myAccount"}
                    className="btn btn-warning btn-sm w-full text-white"
                >
                    My Account <FaRegUser></FaRegUser>
                </Link>
            </li>
            <li
                className={`block md:hidden mt-1 ${!user && "hidden"} ${
                    dbUser?.role === "admin" && "hidden"
                }`}
            >
                <button
                    onClick={() => {
                        logout()
                            .then(() => {
                                Swal.fire({
                                    title: "Logout Successful",
                                    text: "You have been logged out.",
                                    icon: "success",
                                    confirmButtonText: "OK",
                                });
                            })
                            .catch((error) => {
                                Swal.fire({
                                    title: "Logout Failed",
                                    text: "An error occurred while logging out.",
                                    icon: "error",
                                    confirmButtonText: "OK",
                                });
                                console.error("Logout error:", error);
                            });
                    }}
                    className="btn btn-error btn-sm w-full text-white"
                >
                    Logout
                </button>
            </li>
        </>
    );
    return (
        <div className="sticky top-0 z-[1000] bg-base-100">
            <div className="navbar bg-base-100 container mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <a className="text-2xl font-semibold flex items-center gap-2">
                        <img className="w-[40px]" src={logo} alt="" />
                        Furniro
                    </a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end flex gap-4 md:gap-8 items-center">
                    <Link>
                        {dbUser?.role !== "admin" && <IoSearch size={25} />}
                    </Link>
                    <Link to={"/wishlist"}>
                        {dbUser?.role !== "admin" && <FaRegHeart size={20} />}
                    </Link>
                    <Link to={"/cart"}>
                        {dbUser?.role !== "admin" && (
                            <IoCartOutline size={25} />
                        )}
                    </Link>
                    <Link
                        to={
                            dbUser?.role === "admin"
                                ? "/admin/dashboard"
                                : dbUser?.role === "user"
                                ? "/myAccount"
                                : "/login"
                        }
                        className=""
                    >
                        {dbUser?.role === "admin" ? (
                            <span className="w-max btn btn-soft btn-warning flex items-center gap-2">
                                <LuLayoutDashboard
                                    title="Admin Dashboard"
                                    size={20}
                                />
                                Admin Dashboard
                            </span>
                        ) : dbUser?.role === "user" ? (
                            <span className="btn btn-soft btn-warning flex items-center gap-2">
                                <FaRegUser size={20} /> My Account
                            </span>
                        ) : (
                            <span className="flex items-center gap-2 btn btn-soft btn-warning">
                                <FaRegUser size={20} /> Login
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
