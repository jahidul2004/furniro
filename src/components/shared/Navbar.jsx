import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const Navbar = () => {
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
                    <Link to={"/register"}>
                        <FaRegUser size={20} />
                    </Link>
                    <Link>
                        <IoSearch size={20} />
                    </Link>
                    <Link>
                        <FaRegHeart size={20} />
                    </Link>
                    <Link to={"/cart"}>
                        <IoCartOutline size={25} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
