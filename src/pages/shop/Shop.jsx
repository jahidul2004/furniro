import { RiSoundModuleFill } from "react-icons/ri";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { FaGreaterThan } from "react-icons/fa";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard/ProductCard";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";

const Shop = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/allProducts")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);
    return (
        <div>
            {/* Header area */}
            <div>
                {/* Image div */}
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

                {/* Image div end */}

                {/* Action div */}
                <div className="bg-[#f9f0e7] p-4">
                    <div className="w-[95%] md:container mx-auto flex justify-between items-center">
                        {/* Left section */}
                        <div className="flex items-center gap-2">
                            <button className="btn text-lg bg-transparent border-none">
                                <RiSoundModuleFill />
                                Filter
                            </button>
                            |
                            <p className="hidden md:inline font-semibold">
                                Showing 1-18 of 32 items
                            </p>
                        </div>
                        {/* Left section end */}

                        {/* Right section */}
                        <div>
                            <select className="select border-[#000] bg-transparent max-w-xs">
                                <option disabled selected>
                                    Sort By
                                </option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest Product</option>
                                <option>Oldest Product</option>
                            </select>
                        </div>
                        {/* Right section end */}
                    </div>
                </div>
                {/* Action div end */}
            </div>
            {/* Header area end */}

            {/* Products are */}
            <div className="my-10">
                <div className="w-[95%] md:container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {products.map((product) => (
                        <ProductCard
                            data={product}
                            key={product.id}
                        ></ProductCard>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <div className="join border border-[#2ec1ac] rounded">
                        <button className="join-item btn">1</button>
                        <button className="join-item btn">2</button>
                        <button className="join-item btn btn-disabled">
                            ...
                        </button>
                        <button className="join-item btn">4</button>
                        <button className="join-item btn">5</button>
                    </div>
                </div>
            </div>
            {/* Products are end */}

            {/* Feature card start */}
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
            {/* Feature card */}
        </div>
    );
};

export default Shop;
