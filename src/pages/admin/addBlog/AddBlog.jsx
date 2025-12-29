import axios from "axios";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { useContext } from "react";
import Swal from "sweetalert2";

const AddBlog = () => {
    const { user } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const category = form.category.value;
        const date = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        });

        // === Image Upload to imgbb ===
        const formData = new FormData();
        formData.append("image", image);

        const imgbbAPIKey = import.meta.env.VITE_IMAGEBB_API_KEY;
        const imgbbURL = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;

        try {
            const imgResponse = await axios.post(imgbbURL, formData);
            const imageUrl = imgResponse.data.data.url;

            // === Final Blog Data ===
            const blogData = {
                title,
                description,
                image: imageUrl,
                category,
                date,
                addedBy: user?.displayName,
            };

            // === Send to backend ===
            const res = await axios.post(
                "https://furniro-server-bay.vercel.app/addBlog",
                blogData
            );
            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Blog Added",
                    text: "Your blog has been added successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                    position: "top-end",
                });
                form.reset();
            }
        } catch (error) {
            console.error("Error uploading image or saving blog:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "There was an error uploading the image or saving the blog.",
                showConfirmButton: true,
                confirmButtonText: "OK",
                toast: true,
                position: "top-end",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-info">
                    Add New Blog {user?.displayName}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            name="title"
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
                        <select
                            name="category"
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="craft">Craft</option>
                            <option value="design">Design</option>
                            <option value="handmade">Handmade</option>
                            <option value="wood">Wood</option>
                            <option value="interior">Interior</option>
                        </select>
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
