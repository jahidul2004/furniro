import { RiSoundModuleFill } from "react-icons/ri";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { FaGreaterThan, FaSearch, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbTruckDelivery, TbDiscountFilled } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BsGrid, BsListUl } from "react-icons/bs";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { HiOutlineRectangleGroup } from "react-icons/hi2";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOption, setSortOption] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [itemsToShow, setItemsToShow] = useState(8);

    useEffect(() => {
        setLoading(true);
        fetch("https://furniro-server-bay.vercel.app/allProducts")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let result = [...products];

        if (searchTerm) {
            result = result.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortOption === "lowToHigh") {
            result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortOption === "highToLow") {
            result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortOption === "newest") {
            result.sort((a, b) => {
                if (a.isNew && !b.isNew) return -1;
                if (!a.isNew && b.isNew) return 1;
                return new Date(b.date) - new Date(a.date);
            });
        }

        setFilteredProducts(result);
    }, [sortOption, searchTerm, products]);

    const handleLoadMore = () => {
        setItemsToShow((prev) => prev + 4);
    };

    return (
        <div className="bg-white">
            <Helmet>
                <title>Furniro | Shop</title>
            </Helmet>

            <div
                style={{
                    backgroundImage: `url(${shopHeading})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                className="relative h-[250px] w-full flex flex-col justify-center items-center"
            >
                <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>
                <div className="relative z-10 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Shop
                    </h1>
                    <p className="font-medium flex items-center justify-center text-gray-800">
                        Home <FaGreaterThan className="mx-2 text-xs" /> Shop
                    </p>
                </div>
            </div>

            <div className="bg-[#f9f1e7] py-6 sticky top-0 z-40 shadow-sm transition-all">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-800 font-semibold border-r border-gray-400 pr-6">
                            <RiSoundModuleFill className="text-xl" />
                            <span>Filter</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Showing 1–
                            {Math.min(
                                itemsToShow,
                                filteredProducts.length
                            )} of {filteredProducts.length} results
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-10 pr-4 py-2 rounded bg-white border border-gray-300 focus:outline-none focus:border-[#b98e2f] focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                onChange={(e) => setSearchTerm(e.target.value)}
                                value={searchTerm}
                            />
                            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            {searchTerm && (
                                <FaTimes
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-red-500"
                                    onClick={() => setSearchTerm("")}
                                />
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-600">
                                Sort by
                            </span>
                            <select
                                className="px-4 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:border-[#b98e2f] text-sm text-gray-700 cursor-pointer"
                                onChange={(e) => setSortOption(e.target.value)}
                                value={sortOption}
                            >
                                <option value="">Default</option>
                                <option value="lowToHigh">
                                    Price: Low to High
                                </option>
                                <option value="highToLow">
                                    Price: High to Low
                                </option>
                                <option value="newest">Newest Product</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 min-h-[500px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <span className="loading loading-spinner loading-lg text-[#b98e2f]"></span>
                        <p className="mt-4 text-gray-500 animate-pulse">
                            Loading products...
                        </p>
                    </div>
                ) : (
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        {filteredProducts.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {filteredProducts
                                        .slice(0, itemsToShow)
                                        .map((product) => (
                                            <ProductCard
                                                data={product}
                                                key={product._id}
                                            />
                                        ))}
                                </div>

                                {itemsToShow < filteredProducts.length && (
                                    <div className="flex justify-center mt-12">
                                        <button
                                            onClick={handleLoadMore}
                                            className="px-10 py-3 border border-[#b98e2f] text-[#b98e2f] font-bold hover:bg-[#b98e2f] hover:text-white transition-all duration-300 rounded"
                                        >
                                            Show More
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="bg-gray-100 p-6 rounded-full mb-4 text-gray-400">
                                    <FaSearch size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    No Products Found
                                </h2>
                                <p className="text-gray-500 mt-2">
                                    We couldn't find any products matching "
                                    {searchTerm}".
                                </p>
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="mt-6 text-[#b98e2f] font-semibold hover:underline"
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {!loading && filteredProducts.length > 0 && (
                <div className="bg-gradient-to-r from-[#b98e2f]/5 to-[#f9f1e7] py-20 mb-10 relative overflow-hidden">
                    {/* Decorative Background Blur */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#b98e2f]/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b98e2f]/10 rounded-full blur-3xl -z-10"></div>

                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                        {/* Left Side: Text Content */}
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#b98e2f]/20 text-[#b98e2f] text-xs font-bold tracking-widest uppercase mb-4 animate-pulse">
                                <span className="w-2 h-2 rounded-full bg-[#b98e2f]"></span>
                                Coming Soon
                            </div>

                            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif">
                                The Royal <br />
                                <span className="text-[#b98e2f]">
                                    Eid-ul-Fitr
                                </span>{" "}
                                Collection
                            </h2>

                            <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-[#b98e2f] pl-4">
                                We are crafting something truly magnificent for
                                your home this Eid. A fusion of tradition and
                                modern elegance is on its way to redefine your
                                celebration.
                            </p>

                            <div className="flex items-center gap-4 text-gray-500 font-medium">
                                <div className="h-[1px] w-12 bg-[#b98e2f]"></div>
                                <span className="tracking-widest uppercase text-sm">
                                    Unveiling This Ramadan
                                </span>
                            </div>
                        </div>

                        {/* Right Side: Moodboard / Sneak Peek */}
                        <div className="grid grid-cols-2 gap-4 relative">
                            {/* Floating Badge */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-full shadow-2xl z-20 border border-[#b98e2f]/20 text-center">
                                <p className="text-[#b98e2f] font-bold text-xl">
                                    2025
                                </p>
                                <p className="text-gray-500 text-xs tracking-wider uppercase">
                                    Exclusive
                                </p>
                            </div>

                            <div className="space-y-4 translate-y-8">
                                <div className="relative overflow-hidden rounded-xl shadow-lg">
                                    <div className="absolute inset-0 bg-[#b98e2f]/20 hover:bg-transparent transition duration-500 z-10"></div>
                                    <img
                                        src="https://i.ibb.co/zh8tG31F/kitchen.jpg"
                                        alt="Teaser 1"
                                        className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
                                    />
                                </div>
                                <div className="relative overflow-hidden rounded-xl shadow-lg">
                                    <div className="absolute inset-0 bg-black/10 z-10"></div>
                                    <img
                                        src="https://i.ibb.co/prxHZJ6c/bedroom.webp"
                                        alt="Teaser 2"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="relative overflow-hidden rounded-xl shadow-lg">
                                    <div className="absolute inset-0 bg-black/10 z-10"></div>
                                    <img
                                        src="https://i.ibb.co.com/ksyW9M7x/dining.jpg"
                                        alt="Teaser 3"
                                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                                    />
                                </div>
                                <div className="relative overflow-hidden rounded-xl shadow-lg">
                                    <div className="absolute inset-0 bg-[#b98e2f]/20 hover:bg-transparent transition duration-500 z-10"></div>
                                    <img
                                        src="https://i.ibb.co/wNwgcyjy/solid-Wooden-Glass-Door.jpg"
                                        alt="Teaser 4"
                                        className="w-full h-full object-cover transform hover:scale-110 transition duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-[#f9f1e7] py-16">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="text-6xl text-gray-800 group-hover:text-[#b98e2f] transition-colors duration-300">
                            <HiOutlineRectangleGroup />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                High Quality
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                Crafted from top materials
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="text-6xl text-gray-800 group-hover:text-[#b98e2f] transition-colors duration-300">
                            <IoShieldCheckmarkOutline />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Warranty Protection
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                Over 2 years
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="text-6xl text-gray-800 group-hover:text-[#b98e2f] transition-colors duration-300">
                            <TbTruckDelivery />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                Free Shipping
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                Order over 150 $
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="text-6xl text-gray-800 group-hover:text-[#b98e2f] transition-colors duration-300">
                            <MdOutlineSupportAgent />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                24/7 Support
                            </h1>
                            <p className="text-sm font-medium text-gray-500">
                                Dedicated support
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
