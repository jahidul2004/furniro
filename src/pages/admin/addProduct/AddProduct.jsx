import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const AddProduct = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const price = form.price.value;
        const discount = form.discount.value;
        const imageFile = form.image.files[0];
        const image2File = form.image2.files[0];
        const isNew = form.isNew.checked;
        const category = form.category.value;

        try {
            // Upload first image
            const formData1 = new FormData();
            formData1.append("image", imageFile);
            const res1 = await axios.post(
                `https://api.imgbb.com/1/upload?key=${
                    import.meta.env.VITE_IMAGEBB_API_KEY
                }`,
                formData1
            );
            const imageUrl1 = res1.data.data.display_url;

            // Upload second image
            const formData2 = new FormData();
            formData2.append("image", image2File);
            const res2 = await axios.post(
                `https://api.imgbb.com/1/upload?key=${
                    import.meta.env.VITE_IMAGEBB_API_KEY
                }`,
                formData2
            );
            const imageUrl2 = res2.data.data.display_url;

            // Prepare product object
            const product = {
                title,
                description,
                price: parseFloat(price),
                discount: parseFloat(discount),
                images: [imageUrl1, imageUrl2],
                isNew,
                category,
            };

            // Upload product to MongoDB (server)
            await axios.post("http://localhost:3000/addProduct", product, {
                headers: { "Content-Type": "application/json" },
            });

            Swal.fire({
                icon: "success",
                title: "Product added successfully!",
                showConfirmButton: false,
                timer: 2500,
                toast: true,
                position: "top-end",
            });
            form.reset();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Something wrong! Try again.",
                showConfirmButton: false,
                timer: 2500,
                toast: true,
                position: "top-end",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-semibold text-center text-[#b98e2f] mb-8">
                    Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Product Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Wooden Chair"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Write a short product description..."
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                            required
                        />
                    </div>

                    {/* Price and Discount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Price (৳)
                            </label>
                            <input
                                type="number"
                                name="price"
                                placeholder="e.g. 1200"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                name="discount"
                                placeholder="e.g. 10"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Product Image 1
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Product Image 2
                        </label>
                        <input
                            type="file"
                            name="image2"
                            accept="image/*"
                            className="file-input file-input-bordered w-full"
                            required
                        />
                    </div>

                    {/* Is New */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isNew"
                            className="accent-[#b98e2f]"
                        />
                        <label className="text-sm font-medium text-gray-700">
                            Is New Product?
                        </label>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Category
                        </label>
                        <select
                            name="category"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="furniture">Furniture</option>
                            <option value="stationery">Stationery</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#b98e2f] hover:bg-[#a67c1f] transition-colors duration-300 text-white py-3 rounded-lg font-semibold shadow-md"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
