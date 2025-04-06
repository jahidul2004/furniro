import { FaGreaterThan } from "react-icons/fa";

const ProductDetails = () => {
    return (
        <div>
            {/* stats bar */}
            <div className="bg-[#f9f0e7] p-4 md:p-6">
                <div className="w-[95%] md:container mx-auto flex items-center gap-2 font-semibold text-[#9f9f9f] text-lg">
                    Home <FaGreaterThan /> Shop |{" "}
                    <span className="text-black">Agree Sofa</span>
                </div>
            </div>
            {/* stats bar end */}

            {/* Product area */}
            <div className="w-[95%] md:container mx-auto gap-4 md:gap-6 my-4 grid grid-cols-1 md:grid-cols-2">
                {/* Image area */}
                <div>
                    <img
                        className="rounded"
                        src="https://i.ibb.co.com/Xr5MCRyN/hero1.jpg"
                        alt=""
                    />
                </div>
                {/* Image area end */}

                {/* Description area */}
                <div>
                    <h1 className="text-4xl font-bold">This is product name</h1>
                    <p className="my-2 text-xl font-semibold text-[#9f9f9f]">
                        BDT-25000 TK
                    </p>
                    <p className="my-2">⭐⭐⭐⭐⭐ | 5 Reviews</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Harum optio sed, qui corrupti saepe eum eos iure
                        possimus in consequatur! Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Quae, veniam? Lorem ipsum
                        dolor sit amet, consectetur adipisicing elit. Tempora,
                        nisi. Lorem ipsum dolor sit amet.
                    </p>

                    <div className="my-2">
                        <h6 className="mb-2 font-semibold">Size</h6>
                        <div className="flex items-center gap-2">
                            <button className="btn bg-[#b98e2f] text-white border-none shadow-none">
                                S
                            </button>
                            <button className="btn bg-[#f9f0e7] text-black border-none shadow-none">
                                M
                            </button>
                            <button className="btn bg-[#f9f0e7] text-black border-none shadow-none">
                                L
                            </button>
                        </div>
                    </div>

                    <div className="my-2">
                        <h6 className="mb-2 font-semibold">Color</h6>
                        <div className="flex items-center gap-2">
                            <button className="btn bg-blue-600 text-white w-[40px] h-[40px] rounded-full border-none"></button>
                            <button className="btn bg-black text-white w-[40px] h-[40px] rounded-full border-none"></button>
                            <button className="btn bg-[#b98e2f] text-white w-[40px] h-[40px] rounded-full border-none"></button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <button className="btn btn-outline">Add To Cart</button>
                        <button className="btn btn-outline">Compare</button>
                    </div>
                </div>
                {/* Description area end */}
            </div>
            {/* Product area end */}

            {/* Additional data */}
            <div role="tablist" className="tabs tabs-border">
                <a role="tab" className="tab">
                    Tab 1
                </a>
                <a role="tab" className="tab tab-active">
                    Tab 2
                </a>
                <a role="tab" className="tab">
                    Tab 3
                </a>
            </div>

            <div>Main Content here</div>
            {/* Additional data end */}
        </div>
    );
};

export default ProductDetails;
