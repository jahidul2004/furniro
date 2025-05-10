import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthContext/AuthContext";

const AddProduct = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(AuthContext);

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
        const shortDescription = form.shortDescription.value;

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
                shortDescription,
                description,
                price: parseFloat(price),
                discount: parseFloat(discount),
                images: [imageUrl1, imageUrl2],
                isNew,
                category,
                addedDate: new Date(),
                addedBy: user?.displayName,
                addedByEmail: user?.email,
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
        <div className="min-h-screen bg-gradient-to-br from-[#eef4ff] to-[#dbe9ff] py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10">
                <h2 className="text-4xl font-bold text-center text-info mb-10">
                    Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-800">
                            Product Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Wooden Chair"
                            className="w-full border border-gray-300 px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#257bf6]"
                            required
                        />
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-800">
                            Product Short Description
                        </label>
                        <input
                            type="text"
                            name="shortDescription"
                            placeholder="e.g. Elegant and durable chair"
                            className="w-full border border-gray-300 px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#257bf6]"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-800">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            placeholder="Write a detailed product description..."
                            className="w-full border border-gray-300 px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#257bf6]"
                            required
                        />
                    </div>

                    {/* Price and Discount */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-800">
                                Price (৳)
                            </label>
                            <input
                                type="number"
                                name="price"
                                placeholder="e.g. 1200"
                                className="w-full border border-gray-300 px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#257bf6]"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-800">
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                name="discount"
                                placeholder="e.g. 10"
                                className="w-full border border-gray-300 px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#257bf6]"
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-800">
                                Product Image 1
                            </label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="cursor-pointer w-full border border-gray-300 py-2 px-3 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-info file:text-white hover:file:bg-info"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-800">
                                Product Image 2
                            </label>
                            <input
                                type="file"
                                name="image2"
                                accept="image/*"
                                className="w-full border border-gray-300 py-2 px-3 rounded-lg shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-info file:text-white hover:file:bg-info"
                                required
                            />
                        </div>
                    </div>

                    {/* Is New */}
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isNew"
                            className="accent-info w-5 h-5"
                        />
                        <label className="text-sm font-medium text-gray-800">
                            Is New Product?
                        </label>
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium mb-1 text-gray-800">
                            Category
                        </label>
                        <select
                            name="category"
                            className="w-full border border-gray-300 px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-info"
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
                        className="w-full bg-info hover:bg-[#1e67d2] transition-all duration-300 text-white py-3 rounded-lg font-semibold shadow-lg text-lg"
                    >
                        {loading ? "Adding..." : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
