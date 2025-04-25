import { useState } from "react";

const AddProduct = () => {
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        discount: "",
        image: "",
        isNew: false,
        category: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setProduct({ ...product, [name]: files[0]?.name || "" });
        } else {
            setProduct({
                ...product,
                [name]: type === "checkbox" ? checked : value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Product:", product);
        // API call or localStorage logic here
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <h2 className="text-3xl font-semibold text-center text-[#b98e2f] mb-8">
                    Add New Product
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Product Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={handleChange}
                            placeholder="e.g. Wooden Chair"
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows={4}
                            value={product.description}
                            onChange={handleChange}
                            placeholder="Write a short product description..."
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700">
                                Price (৳)
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
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
                                value={product.discount}
                                onChange={handleChange}
                                placeholder="e.g. 10"
                                className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Product Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="file-input file-input-bordered w-full"
                            required
                        />
                        {product.image && (
                            <p className="text-sm mt-1 text-green-600">
                                Selected: {product.image}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            name="isNew"
                            checked={product.isNew}
                            onChange={handleChange}
                            className="accent-[#b98e2f]"
                        />
                        <label className="text-sm font-medium text-gray-700">
                            Is New Product?
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Category
                        </label>
                        <select
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                            required
                        >
                            <option value="">Select category</option>
                            <option value="furniture">Furniture</option>
                            <option value="stationery">Stationery</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#b98e2f] hover:bg-[#a67c1f] transition-colors duration-300 text-white py-3 rounded-lg font-semibold shadow-md"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
