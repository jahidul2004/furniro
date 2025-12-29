import { useContext } from "react";
import AuthContext from "../../../context/AuthContext/AuthContext";
import {
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaEdit,
    FaCamera,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";

const AdminProfile = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen flex justify-center items-start">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-48 w-full bg-gradient-to-r from-[#b98e2f] to-[#dcb35c] relative">
                    <div className="absolute top-4 right-4">
                        <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all text-sm font-semibold">
                            <FaCamera /> Edit Cover
                        </button>
                    </div>
                </div>

                <div className="px-8 pb-8 relative">
                    <div className="relative -mt-20 mb-6 flex flex-col items-center">
                        <div className="relative">
                            <img
                                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                                src={
                                    user?.photoURL
                                        ? user.photoURL
                                        : "https://cdn-icons-png.flaticon.com/128/18567/18567329.png"
                                }
                                alt="Admin Profile"
                            />
                            <button className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full hover:bg-[#b98e2f] transition-colors border-2 border-white">
                                <FaCamera size={14} />
                            </button>
                        </div>

                        <div className="text-center mt-4">
                            <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
                                {user?.displayName || "Admin User"}
                                <MdVerified
                                    className="text-blue-500"
                                    title="Verified Admin"
                                />
                            </h1>
                            <p className="text-gray-500 font-medium">
                                Administrator
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-gray-100 pt-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-[#b98e2f] pl-3">
                                Contact Information
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#b98e2f] shadow-sm">
                                        <FaEnvelope />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-semibold uppercase">
                                            Email Address
                                        </p>
                                        <p className="text-gray-700 font-medium">
                                            {user?.email}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#b98e2f] shadow-sm">
                                        <FaPhoneAlt />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-semibold uppercase">
                                            Phone
                                        </p>
                                        <p className="text-gray-700 font-medium">
                                            +880 1234 567 890
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#b98e2f] shadow-sm">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-semibold uppercase">
                                            Location
                                        </p>
                                        <p className="text-gray-700 font-medium">
                                            Dhaka, Bangladesh
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 border-l-4 border-[#b98e2f] pl-3">
                                Account Activity
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-blue-50 rounded-xl text-center">
                                    <h4 className="text-3xl font-bold text-blue-600">
                                        120+
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Products Added
                                    </p>
                                </div>
                                <div className="p-4 bg-green-50 rounded-xl text-center">
                                    <h4 className="text-3xl font-bold text-green-600">
                                        5k+
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Orders Processed
                                    </p>
                                </div>
                                <div className="p-4 bg-purple-50 rounded-xl text-center">
                                    <h4 className="text-3xl font-bold text-purple-600">
                                        25
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Blogs Posted
                                    </p>
                                </div>
                                <div className="p-4 bg-orange-50 rounded-xl text-center">
                                    <h4 className="text-3xl font-bold text-orange-600">
                                        4.9
                                    </h4>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Admin Rating
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="flex items-center gap-2 text-sm text-gray-500 justify-center md:justify-start">
                                    <FaCalendarAlt />
                                    <span>
                                        Joined:{" "}
                                        {user?.metadata?.creationTime
                                            ? new Date(
                                                  user.metadata.creationTime
                                              ).toDateString()
                                            : "N/A"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <button className="flex items-center gap-2 px-8 py-3 bg-[#b98e2f] hover:bg-[#a17b2a] text-white font-bold rounded-lg shadow-lg transition-all transform hover:-translate-y-1">
                            <FaEdit /> Edit Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
