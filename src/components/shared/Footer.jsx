import {
    FaFacebook,
    FaLinkedinIn,
    FaTwitter,
    FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="w-[95%] md:container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Furniro.
                        </h2>
                        <address className="not-italic text-[#9f9f9f] leading-relaxed">
                            16/C-D, Noorjahan Road, Bashbari, Mohammadpur,
                            Dhaka-1207
                        </address>
                        <div className="flex gap-4 pt-2">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-[#b98e2f] hover:text-white transition-all duration-300"
                            >
                                <FaFacebook size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-[#b98e2f] hover:text-white transition-all duration-300"
                            >
                                <FaInstagram size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-[#b98e2f] hover:text-white transition-all duration-300"
                            >
                                <FaTwitter size={18} />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-[#b98e2f] hover:text-white transition-all duration-300"
                            >
                                <FaLinkedinIn size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="space-y-6">
                        <h4 className="text-[#9f9f9f] font-medium">Links</h4>
                        <ul className="space-y-4 font-semibold text-gray-800">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-[#b98e2f] transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shop"
                                    className="hover:text-[#b98e2f] transition-colors"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-[#b98e2f] transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-[#b98e2f] transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div className="space-y-6">
                        <h4 className="text-[#9f9f9f] font-medium">Help</h4>
                        <ul className="space-y-4 font-semibold text-gray-800">
                            <li>
                                <Link
                                    to="#"
                                    className="hover:text-[#b98e2f] transition-colors"
                                >
                                    Payment Options
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="hover:text-[#b98e2f] transition-colors"
                                >
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="hover:text-[#b98e2f] transition-colors"
                                >
                                    Privacy Policies
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 pt-8">
                    <p className="text-gray-800 text-sm md:text-base">
                        2025 Furniro. All rights reserved | Developed by Jihad,
                        Twahidul, Forhad, Shihab, Araf, Mahi, Parthib, Alif,
                        Hasan, Roni
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
