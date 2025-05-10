import { RiSoundModuleFill } from "react-icons/ri";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { FaGreaterThan } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";
import { BsGrid } from "react-icons/bs";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        fetch("http://localhost:3000/allProducts")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            });
    }, []);

    // Handle Sorting
    useEffect(() => {
        let sorted = [...filteredProducts];

        if (sortOption === "lowToHigh") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortOption === "highToLow") {
            sorted.sort((a, b) => b.price - a.price);
        } else if (sortOption === "newest") {
            sorted.sort((a, b) => {
                if (a.isNew && !b.isNew) return -1;
                if (!a.isNew && b.isNew) return 1;

                return new Date(b.date) - new Date(a.date);
            });
        }
        setFilteredProducts(sorted);
    }, [sortOption]);

    return (
        <div>
            {/* Header area */}
            <div>
                <div
                    style={{
                        backgroundImage: `url(${shopHeading})`,
                        width: "100%",
                    }}
                    className="h-[220px] w-full bg-cover flex flex-col justify-center items-center"
                >
                    <h1 className="text-3xl font-semibold">Shop</h1>
                    <p className="mt-2 font-semibold flex items-center">
                        Home <FaGreaterThan className="mx-3" /> Shop
                    </p>
                </div>

                {/* Action div */}
                <div className="bg-[#f9f0e7] p-4">
                    <div className="w-[95%] md:container mx-auto flex justify-between items-center">
                        {/* Left section */}
                        <div className="flex items-center gap-2">
                            <p className="font-semibold flex items-center gap-2">
                                <BsGrid /> Showing {filteredProducts?.length}{" "}
                                items
                            </p>
                        </div>

                        {/* Right section */}
                        <div>
                            <select
                                className="select border-[#000] bg-transparent max-w-xs"
                                onChange={(e) => setSortOption(e.target.value)}
                            >
                                <option disabled selected>
                                    Sort By
                                </option>
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

            {/* Products */}
            <div className="my-10">
                <div className="w-[95%] md:container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {filteredProducts?.map((product) => (
                        <ProductCard
                            data={product}
                            key={product?._id}
                        ></ProductCard>
                    ))}
                </div>
            </div>

            {/* Feature card */}
            <div className="bg-[#f9f0e7]">
                <div className="w-[95%] md:container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="flex items-center gap-2">
                        <HiOutlineTrophy size={60} />
                        <div>
                            <h1 className="text-xl font-bold">High Quality</h1>
                            <p className="font-semibold text-[#898989]">
                                Crafted from top materials
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoShieldCheckmarkOutline size={60} />
                        <div>
                            <h1 className="text-xl font-bold">
                                Warranty Protection
                            </h1>
                            <p className="font-semibold text-[#898989]">
                                Over 2 years
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <TbTruckDelivery size={60} />
                        <div>
                            <h1 className="text-xl font-bold">Free shipping</h1>
                            <p className="font-semibold text-[#898989]">
                                Order over 150 $
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdOutlineSupportAgent size={60} />
                        <div>
                            <h1 className="text-xl font-bold">24/7 support</h1>
                            <p className="font-semibold text-[#898989]">
                                With your team
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
