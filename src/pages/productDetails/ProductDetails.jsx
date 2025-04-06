import { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ProductDetails = () => {
    const currentId = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({});

    console.log("Current products is:", currentProduct);

    useEffect(() => {
        fetch("/products.json")
            .then((res) => res.json())
            .then((data) => {
                setRelatedProducts(data);
                data.map((item) => {
                    if (item.id == currentId.id) {
                        setCurrentProduct(item);
                    } else {
                        setCurrentProduct({});
                    }
                });
            });
    }, []);
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
            <div className="w-[95%] md:container mx-auto my-10 py-5 text-center border-y border-[#9f9f9f]">
                <Tabs>
                    <TabList
                        className={
                            "text-lg font-semibold my-2 flex justify-center items-center gap-4"
                        }
                    >
                        <Tab
                            selectedClassName="text-[#b98e2f]"
                            className="cursor-pointer"
                        >
                            Description
                        </Tab>
                        <Tab
                            selectedClassName="text-[#b98e2f]"
                            className={"cursor-pointer"}
                        >
                            Additional Info
                        </Tab>
                        <Tab
                            selectedClassName="text-[#b98e2f]"
                            className={"cursor-pointer"}
                        >
                            Reviews(5)
                        </Tab>
                    </TabList>

                    <TabPanel className={"mx-0 md:mx-5 lg:mx-20"}>
                        <p className="text-justify text-[#9f9f9f]">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Harum optio sed, qui corrupti saepe eum eos
                            iure possimus in consequatur! Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. Quae, veniam?
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Tempora, nisi. Lorem ipsum dolor sit amet.
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Veritatis nihil repellat ratione accusantium
                            blanditiis saepe, odio quae aspernatur sint
                            voluptatem? Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Harum optio sed, qui corrupti
                            saepe eum eos iure possimus in consequatur! Lorem
                            ipsum.
                        </p>
                    </TabPanel>
                    <TabPanel>
                        <h2>Additional Info Here</h2>
                    </TabPanel>
                    <TabPanel>
                        <h2>Reviews Here</h2>
                    </TabPanel>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <img
                        className="h-[300px] w-full rounded"
                        src="https://i.ibb.co.com/Xr5MCRyN/hero1.jpg"
                        alt=""
                    />
                    <img
                        className="h-[300px] w-full rounded"
                        src="https://i.ibb.co.com/Xr5MCRyN/hero1.jpg"
                        alt=""
                    />
                </div>
            </div>

            {/* Additional data end */}

            {/* Related products */}
            <div>
                <h1 className="text-3xl font-bold text-center mb-4">
                    Related Products
                </h1>
                <div></div>
            </div>
            {/* Related products end */}
        </div>
    );
};

export default ProductDetails;
