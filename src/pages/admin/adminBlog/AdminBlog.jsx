import axios from "axios";
import { useEffect, useState } from "react";
import { FaBlog, FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("https://furniro-server-bay.vercel.app/allBlogs")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
            });
    }, []);

    const handleDeleteBlog = (id) => {
        axios
            .delete(`https://furniro-server-bay.vercel.app/deleteBlog/${id}`)
            .then((res) => {
                setBlogs((prevBlogs) =>
                    prevBlogs.filter((blog) => blog._id !== id)
                );
                Swal.fire({
                    icon: "success",
                    title: "Blog Deleted",
                    text: "The blog has been deleted successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: "top-end",
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "There was an error deleting the blog.",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    toast: true,
                    position: "top-end",
                });
                console.error("Error deleting blog:", error);
            });
    };
    return (
        <div className="p-6">
            <h2 className="rounded text-2xl font-bold mb-6 flex items-center gap-2 bg-info text-white p-2 md:p-4">
                <FaBlog size={28} className="text-white" />
                Blogs
            </h2>
            <div className="overflow-x-auto border border-gray-200">
                <table className="min-w-full bg-white shadow-md overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-sm font-semibold text-gray-600">
                            <th className="px-6 py-3">Image</th>
                            <th className="px-6 py-3">Blog Title</th>
                            <th className="px-6 py-3">Added Date</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs?.map((blog) => (
                            <tr
                                key={blog?._id}
                                className="border-t border-gray-200"
                            >
                                <td className="px-6 py-4">
                                    <img
                                        src={blog?.image}
                                        alt={blog?.title}
                                        className="w-14 h-14 object-cover rounded"
                                    />
                                </td>
                                <td className="px-6 py-4 font-medium">
                                    {blog?.title}
                                    <br />
                                    <span className="flex items-center gap-1 text-info">
                                        <FaRegUserCircle />
                                        {blog?.addedBy}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{blog?.date}</td>
                                <td className="px-6 py-4 flex gap-2">
                                    <button
                                        onClick={() => {
                                            handleDeleteBlog(blog?._id);
                                        }}
                                        className="btn btn-sm btn-error btn-soft"
                                    >
                                        Delete
                                    </button>
                                    <Link
                                        to={`/blog/${blog._id}`}
                                        className="btn btn-sm btn-info btn-soft"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminBlog;
