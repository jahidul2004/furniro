import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../../context/AuthContext/AuthContext";
import { FaBoxOpen, FaCloudUploadAlt, FaSave } from "react-icons/fa";

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
        const additionalInfo = form.additionalInfo.value;
        const features = form.features.value
            .split(",")
            .map((feature) => feature.trim());

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
                additionalInfo,
                features,
            };

            // Upload product to MongoDB (server)
            await axios.post(
                "https://furniro-server-bay.vercel.app/addProduct",
                product,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            Swal.fire({
                icon: "success",
                title: "Product added successfully!",
                showConfirmButton: false,
                timer: 2500,
                toast: true,
                position: "top-end",
                iconColor: "#b98e2f",
            });
            form.reset();
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Something went wrong! Try again.",
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
        <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-sm border border-gray-100 rounded-2xl p-8 md:p-10">
                {/* Form Header */}
                <div className="mb-8 border-b border-gray-100 pb-6 text-center md:text-left">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-3">
                        <FaBoxOpen className="text-[#b98e2f]" />
                        Add New Product
                    </h2>
                    <p className="text-gray-500 mt-2">
                        Fill in the information below to add a new product to
                        your inventory.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* General Info Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-[#b98e2f] pl-3">
                            General Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Product Title{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Luxury Sofa Set"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all cursor-pointer"
                                    required
                                >
                                    <option value="" disabled selected>
                                        Select a category
                                    </option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Living Room">
                                        Living Room
                                    </option>
                                    <option value="Bedroom">Bedroom</option>
                                    <option value="Office">Office</option>
                                    <option value="Dining">Dining</option>
                                    <option value="Decor">Decor</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Short Description{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="shortDescription"
                                placeholder="e.g. Elegant and durable chair for modern homes"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Description{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="description"
                                rows={5}
                                placeholder="Write a detailed product description here..."
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all resize-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Pricing & Features Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-[#b98e2f] pl-3">
                            Pricing & Features
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Price (৳){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Discount (%)
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    placeholder="0"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Features (Comma Separated){" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="features"
                                placeholder="e.g. Durable Wood, Waterproof, Easy Assembly"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Additional Info
                            </label>
                            <textarea
                                name="additionalInfo"
                                rows={2}
                                placeholder="Any extra notes (e.g. Warranty details)..."
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                            />
                        </div>
                    </div>

                    {/* Media Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-[#b98e2f] pl-3">
                            Product Images
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control w-full">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Cover Image{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-white hover:border-[#b98e2f] transition-all text-center cursor-pointer group">
                                    <FaCloudUploadAlt className="mx-auto text-3xl text-gray-400 group-hover:text-[#b98e2f] mb-2" />
                                    <span className="text-sm text-gray-500">
                                        Click to upload image
                                    </span>
                                    <input
                                        type="file"
                                        name="image"
                                        accept="image/*"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Detail Image{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-white hover:border-[#b98e2f] transition-all text-center cursor-pointer group">
                                    <FaCloudUploadAlt className="mx-auto text-3xl text-gray-400 group-hover:text-[#b98e2f] mb-2" />
                                    <span className="text-sm text-gray-500">
                                        Click to upload image
                                    </span>
                                    <input
                                        type="file"
                                        name="image2"
                                        accept="image/*"
                                        required
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Checkbox */}
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <input
                            type="checkbox"
                            name="isNew"
                            id="isNew"
                            className="w-5 h-5 text-[#b98e2f] border-gray-300 rounded focus:ring-[#b98e2f] cursor-pointer"
                        />
                        <label
                            htmlFor="isNew"
                            className="text-sm font-semibold text-gray-800 cursor-pointer select-none"
                        >
                            Mark as "New Arrival"
                        </label>
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
                                    <FaSave /> Save Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
