import { useState } from "react";

const AddBlog = () => {
    const [blogData, setBlogData] = useState({
        title: "",
        image: "",
        description: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(blogData);
        // এখানে তুমি তোমার API call বা ফর্ম সাবমিশনের কাজ করতে পারবে
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-info">
                    Add New Blog
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={blogData.title}
                            onChange={handleChange}
                            placeholder="Enter blog title"
                            className="input w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            placeholder="Enter image URL"
                            className="file-input w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={blogData.description}
                            onChange={handleChange}
                            placeholder="Write blog description..."
                            rows="5"
                            className="input w-full"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Category
                        </label>
                        <input
                            type="text"
                            name="category"
                            value={blogData.category}
                            onChange={handleChange}
                            placeholder="Enter blog category"
                            className="input w-full"
                            required
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-info text-white"
                        >
                            Submit Blog
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
