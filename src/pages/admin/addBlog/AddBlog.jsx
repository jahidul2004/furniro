import axios from "axios";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { FaPenNib, FaCloudUploadAlt, FaSave, FaUserEdit } from "react-icons/fa";

const AddBlog = () => {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const category = form.category.value;
        const date = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

        const formData = new FormData();
        formData.append("image", image);

        const imgbbAPIKey = import.meta.env.VITE_IMAGEBB_API_KEY;
        const imgbbURL = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;

        try {
            const imgResponse = await axios.post(imgbbURL, formData);
            const imageUrl = imgResponse.data.data.url;

            const blogData = {
                title,
                description,
                image: imageUrl,
                category,
                date,
                addedBy: user?.displayName,
            };

            const res = await axios.post(
                "https://furniro-server-bay.vercel.app/addBlog",
                blogData
            );
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Published!",
                    text: "Your blog has been published successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: "top-end",
                    iconColor: "#b98e2f",
                });
                form.reset();
            }
        } catch (error) {
            console.error("Error uploading image or saving blog:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong. Please try again.",
                showConfirmButton: false,
                timer: 2000,
                toast: true,
                position: "top-end",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-100 rounded-2xl p-8 md:p-10">
                {/* Header */}
                <div className="mb-8 border-b border-gray-100 pb-6 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-3">
                        <FaPenNib className="text-[#b98e2f]" />
                        Write New Blog
                    </h2>
                    <p className="text-gray-500 mt-2 flex items-center justify-center md:justify-start gap-2">
                        <FaUserEdit /> Author:{" "}
                        <span className="font-semibold text-gray-700">
                            {user?.displayName}
                        </span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Title & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Blog Title{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter an engaging title..."
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="category"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all cursor-pointer"
                                required
                            >
                                <option value="" disabled selected>
                                    Select category
                                </option>
                                <option value="Craft">Craft</option>
                                <option value="Design">Design</option>
                                <option value="Handmade">Handmade</option>
                                <option value="Wood">Wood</option>
                                <option value="Interior">Interior</option>
                                <option value="Tips & Tricks">
                                    Tips & Tricks
                                </option>
                            </select>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Cover Image{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-2.5 bg-gray-50 hover:bg-white hover:border-[#b98e2f] transition-all text-center cursor-pointer group flex items-center justify-center h-[50px]">
                                <div className="flex items-center gap-3 pointer-events-none">
                                    <FaCloudUploadAlt className="text-xl text-gray-400 group-hover:text-[#b98e2f]" />
                                    <span className="text-sm text-gray-500 group-hover:text-gray-700">
                                        Choose file
                                    </span>
                                </div>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    required
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            rows="10"
                            placeholder="Write your blog content here..."
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all resize-none"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#b98e2f] hover:bg-[#a17b2a] text-white py-4 rounded-lg font-bold shadow-lg transition-all duration-300 flex justify-center items-center gap-2 text-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (
                                <>
                                    <FaSave /> Publish Blog
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBlog;
