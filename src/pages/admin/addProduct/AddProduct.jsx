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
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("New Product:", product);
        // এখানে API call বা localStorage logic বসাতে পারো
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
                Add New Product
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium mb-1">
                            Price (৳)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium mb-1">
                            Discount (%)
                        </label>
                        <input
                            type="number"
                            name="discount"
                            value={product.discount}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-lg"
                        />
                    </div>
                </div>

                <div>
                    <label className="block font-medium mb-1">Image</label>
                    <input
                        type="file"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        className="file-input w-full"
                        required
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="isNew"
                        checked={product.isNew}
                        onChange={handleChange}
                    />
                    <label>Is New Product?</label>
                </div>

                <div>
                    <label className="block font-medium mb-1">Category</label>
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded-lg"
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
                    className="w-full bg-[#b98e2f] text-white py-2 rounded-lg"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
