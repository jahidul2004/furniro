import axios from "axios";
import { useEffect, useState } from "react";
import {
    FaBlog,
    FaRegUserCircle,
    FaTrashAlt,
    FaEye,
    FaCalendarAlt,
    FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setLoading(true);
        fetch("https://furniro-server-bay.vercel.app/allBlogs")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleDeleteBlog = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(
                        `https://furniro-server-bay.vercel.app/deleteBlog/${id}`
                    )
                    .then((res) => {
                        setBlogs((prevBlogs) =>
                            prevBlogs.filter((blog) => blog._id !== id)
                        );
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Your blog file has been deleted.",
                            showConfirmButton: false,
                            timer: 1500,
                            toast: true,
                            position: "top-end",
                            iconColor: "#b98e2f",
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Something went wrong.",
                        });
                        console.error("Error deleting blog:", error);
                    });
            }
        });
    };

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <FaBlog className="text-[#b98e2f]" />
                        Blog Management
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Manage your blog posts and articles
                    </p>
                </div>

                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-80">
                        <input
                            className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-[#b98e2f] focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all shadow-sm"
                            type="text"
                            placeholder="Search blogs..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center min-w-[100px]">
                        <span className="font-bold text-gray-700">
                            Total:{" "}
                            <span className="text-[#b98e2f]">
                                {blogs.length}
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                <th className="px-6 py-4">Blog Info</th>
                                <th className="px-6 py-4">Author</th>
                                <th className="px-6 py-4">Published Date</th>
                                <th className="px-6 py-4 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog) => (
                                    <tr
                                        key={blog?._id}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                                                    <img
                                                        src={blog?.image}
                                                        alt={blog?.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-800 text-base line-clamp-1 max-w-[250px]">
                                                        {blog?.title}
                                                    </h3>
                                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
                                                        {blog?.category ||
                                                            "General"}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FaRegUserCircle className="text-gray-400 text-lg" />
                                                <span className="text-sm font-medium text-gray-700">
                                                    {blog?.addedBy || "Admin"}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded w-max border border-gray-100">
                                                <FaCalendarAlt className="text-[#b98e2f]" />
                                                {blog?.date}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-3">
                                                <Link
                                                    to={`/blog/${blog._id}`}
                                                    className="p-2 rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm tooltip"
                                                    title="View Blog"
                                                >
                                                    <FaEye />
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDeleteBlog(
                                                            blog?._id
                                                        )
                                                    }
                                                    className="p-2 rounded bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm tooltip"
                                                    title="Delete Blog"
                                                >
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="text-center py-10"
                                    >
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <FaBlog
                                                size={48}
                                                className="mb-2 opacity-50"
                                            />
                                            <p className="text-lg font-medium">
                                                No blogs found
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminBlog;
