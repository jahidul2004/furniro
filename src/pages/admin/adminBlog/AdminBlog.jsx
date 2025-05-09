import { useEffect, useState } from "react";
import { FaBlog, FaRegUserCircle } from "react-icons/fa";

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);

    console.log(blogs);

    useEffect(() => {
        fetch("http://localhost:3000/allBlogs")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
            });
    }, []);
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaBlog size={28} className="text-info" />
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
                                    <button className="btn btn-sm btn-error btn-soft border border-dashed border-error">
                                        Delete
                                    </button>
                                    <button className="btn btn-sm btn-info btn-soft border border-dashed border-info">
                                        View
                                    </button>
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
