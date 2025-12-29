import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import { FaRegHeart, FaRegUser, FaBars, FaTimes } from "react-icons/fa";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { AiOutlineLogin } from "react-icons/ai";

const Navbar = () => {
    const { user, logout, dbUser } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);

    // Handle Scroll Effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        logout()
            .then(() => {
                Swal.fire({
                    title: "Logged Out",
                    text: "See you soon!",
                    icon: "success",
                    confirmButtonColor: "#b98e2f",
                    timer: 1500,
                    showConfirmButton: false,
                });
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    const navLinks = [
        { path: "/", title: "Home" },
        { path: "/shop", title: "Shop" },
        { path: "/about", title: "About" },
        { path: "/contact", title: "Contact" },
        { path: "/blog", title: "Blog" },
    ];

    return (
        <div
            className={`sticky top-0 z-[1000] transition-all duration-300 ${
                scrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
            }`}
        >
            <div className="navbar container mx-auto px-4 md:px-8">
                {/* Navbar Start: Logo & Mobile Menu Toggle */}
                <div className="navbar-start">
                    <div className="dropdown lg:hidden">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost px-0 mr-4"
                        >
                            <FaBars size={24} className="text-gray-700" />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-lg bg-white rounded-box w-64 border border-gray-100"
                        >
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <NavLink
                                        to={link.path}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-[#b98e2f] font-bold"
                                                : "text-gray-600 font-medium"
                                        }
                                    >
                                        {link.title}
                                    </NavLink>
                                </li>
                            ))}

                            {/* Mobile Auth Buttons */}
                            <div className="divider my-2"></div>
                            {!user ? (
                                <div className="flex flex-col gap-2">
                                    <Link
                                        to="/login"
                                        className="btn btn-sm bg-[#b98e2f] text-white border-none"
                                    >
                                        Login <AiOutlineLogin />
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="btn btn-sm btn-outline border-[#b98e2f] text-[#b98e2f]"
                                    >
                                        Register
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    {dbUser?.role === "user" && (
                                        <li>
                                            <Link
                                                to="/myAccount"
                                                className="justify-between"
                                            >
                                                My Account <FaRegUser />
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-red-500"
                                        >
                                            Logout <LuLogOut />
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    <Link to="/" className="flex items-center gap-2 group">
                        <img
                            className="w-[35px] md:w-[45px] transition-transform group-hover:rotate-12"
                            src={logo}
                            alt="Furniro"
                        />
                        <span className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide font-montserrat">
                            Furniro
                        </span>
                    </Link>
                </div>

                {/* Navbar Center: Desktop Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-8">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `text-base font-medium transition-all duration-300 hover:bg-transparent hover:text-[#b98e2f] focus:text-[#b98e2f] ${
                                            isActive
                                                ? "text-[#b98e2f] font-bold"
                                                : "text-gray-800"
                                        }`
                                    }
                                >
                                    {link.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Navbar End: Icons & User Actions */}
                <div className="navbar-end flex items-center gap-5">
                    {/* Common Icons */}
                    <div className="hidden sm:flex items-center gap-6 text-gray-800">
                        {/* Search Icon (Dummy for UI) */}
                        {/* <button className="hover:text-[#b98e2f] transition-colors"><IoSearch size={24} /></button> */}

                        {dbUser?.role !== "admin" && (
                            <>
                                <Link
                                    to="/wishlist"
                                    className="hover:text-[#b98e2f] transition-colors relative group"
                                >
                                    <FaRegHeart size={22} />
                                    {/* Optional Badge Logic can go here */}
                                </Link>
                                <Link
                                    to="/cart"
                                    className="hover:text-[#b98e2f] transition-colors relative group"
                                >
                                    <IoCartOutline size={26} />
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Authentication Logic */}
                    <div className="ml-2">
                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar online placeholder"
                                >
                                    <div className="bg-[#b98e2f]/10 text-[#b98e2f] rounded-full w-10 border border-[#b98e2f]">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt="User"
                                            />
                                        ) : (
                                            <span className="text-xl font-bold">
                                                {user.displayName?.charAt(
                                                    0
                                                ) || <FaRegUser />}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-white rounded-box w-52 border border-gray-100"
                                >
                                    <li className="px-4 py-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                        {dbUser?.role === "admin"
                                            ? "Administrator"
                                            : "User Menu"}
                                    </li>

                                    {dbUser?.role === "admin" ? (
                                        <li>
                                            <Link
                                                to="/admin/dashboard"
                                                className="font-semibold hover:text-[#b98e2f] active:bg-[#b98e2f]/20"
                                            >
                                                <LuLayoutDashboard /> Dashboard
                                            </Link>
                                        </li>
                                    ) : (
                                        <li>
                                            <Link
                                                to="/myAccount"
                                                className="font-semibold hover:text-[#b98e2f] active:bg-[#b98e2f]/20"
                                            >
                                                <FaRegUser /> My Account
                                            </Link>
                                        </li>
                                    )}

                                    <div className="divider my-0"></div>
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-red-500 hover:bg-red-50"
                                        >
                                            <LuLogOut /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn btn-sm md:btn-md bg-[#b98e2f] hover:bg-[#a17b2a] text-white border-none px-6 font-bold shadow-sm"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
