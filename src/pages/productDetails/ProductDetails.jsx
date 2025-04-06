import { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProductCard from "../../components/productCard/ProductCard";

const ProductDetails = () => {
    const currentId = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({});

    console.log("Current products is:", currentProduct);

    useEffect(() => {
        fetch("/products.json")
            .then((res) => res.json())
            .then((data) => {
                const matched = data.find((item) => item.id == currentId.id);
                setCurrentProduct(matched || {});

                if (matched) {
                    const related = data.filter(
                        (item) =>
                            item.category === matched.category &&
                            item.id != matched.id
                    );
                    setRelatedProducts(related);
                    console.log("Related Products:", related);
                }
            });
    }, [currentId]);

    return (
        <div>
            {/* stats bar */}
            <div className="bg-[#f9f0e7] p-4 md:p-6">
                <div className="w-[95%] md:container mx-auto flex items-center gap-2 font-semibold text-[#9f9f9f] text-lg">
                    Home <FaGreaterThan /> Shop |{" "}
                    <span className="text-black">{currentProduct?.title}</span>
                </div>
            </div>
            {/* stats bar end */}

            {/* Product area */}
            <div className="w-[95%] md:container mx-auto gap-4 md:gap-6 my-4 grid grid-cols-1 md:grid-cols-2">
                {/* Image area */}
                <div>
                    <img
                        className="rounded"
                        src={currentProduct?.image}
                        alt=""
                    />
                </div>
                {/* Image area end */}

                {/* Description area */}
                <div>
                    <h1 className="text-4xl font-bold">
                        {currentProduct?.title}
                    </h1>
                    <p className="my-2 text-xl font-semibold text-[#9f9f9f]">
                        BDT-{currentProduct?.price} TK
                    </p>
                    <p className="my-2">⭐⭐⭐⭐⭐ | 5 Reviews</p>
                    <p>{currentProduct?.description}</p>

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
                            {currentProduct?.description}
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
                        src={currentProduct?.image}
                        alt=""
                    />
                    <img
                        className="h-[300px] w-full rounded"
                        src={currentProduct?.image}
                        alt=""
                    />
                </div>
            </div>

            {/* Additional data end */}

            {/* Related products */}
            <div className="my-10">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Related Products
                </h1>
                <div className="w-[95%] md:container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {relatedProducts?.map((product) => (
                        <ProductCard
                            key={product?.id}
                            data={product}
                        ></ProductCard>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <Link
                        className="btn border border-[#b98e2f] text-[#b98e2f]"
                        to={"/shop"}
                    >
                        Show More
                    </Link>
                </div>
            </div>
            {/* Related products end */}
        </div>
    );
};

export default ProductDetails;
