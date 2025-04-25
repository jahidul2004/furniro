import { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ProductCard from "../../components/productCard/ProductCard";
import Swal from "sweetalert2";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import { MessageCircleOff } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const ProductDetails = () => {
    const currentId = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({});
    const [reviews, setReviews] = useState([]);

    console.log("my reviews", reviews);

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

    useEffect(() => {
        fetch("/review.json")
            .then((res) => res.json())
            .then((data) => {
                const matched = data.filter(
                    (item) => item.productId == currentId.id
                );
                setReviews(matched || []);
            });
    }, []);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added to cart",
            showConfirmButton: false,
            timer: 2500,
            toast: true,
        });
    };

    return (
        <div>
            {/* stats bar */}
            <div className="bg-[#f9f0e7] p-4 md:p-6">
                <div className="w-[95%] md:container mx-auto flex items-center gap-2 font-semibold text-[#9f9f9f] text-lg">
                    <Link to={"/"}>Home</Link> <FaGreaterThan />{" "}
                    <Link to={"/shop"}>Shop</Link> |{" "}
                    <span className="text-black">{currentProduct?.title}</span>
                </div>
            </div>
            {/* stats bar end */}

            {/* Product area */}
            <div className="w-[95%] md:container mx-auto gap-4 md:gap-6 my-4 grid grid-cols-1 md:grid-cols-2">
                {/* Image area */}
                <div>
                    <img
                        className="rounded w-full h-full"
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
                        <button
                            onClick={() => {
                                handleAddToCart(currentProduct);
                            }}
                            className="btn btn-outline"
                        >
                            Add To Cart
                        </button>
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
                            Reviews({reviews?.length})
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
                        <div className="my-10">
                            {reviews && reviews.length > 0 ? (
                                <Swiper
                                    modules={[Autoplay, Pagination]}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    pagination={{ clickable: true }}
                                    spaceBetween={30}
                                    breakpoints={{
                                        640: { slidesPerView: 1 },
                                        768: { slidesPerView: 2 },
                                        1024: { slidesPerView: 3 },
                                    }}
                                >
                                    {reviews.map((review) => (
                                        <SwiperSlide key={review?.id}>
                                            <ReviewCard data={review} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            ) : (
                                <div className="col-span-full text-center py-10">
                                    <MessageCircleOff
                                        className="mx-auto text-gray-400"
                                        size={40}
                                    />
                                    <h1 className="text-xl font-semibold text-gray-500 mt-2">
                                        No reviews yet
                                    </h1>
                                </div>
                            )}
                        </div>
                    </TabPanel>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <img
                        className="h-[350px] w-full rounded"
                        src={currentProduct?.image}
                        alt=""
                    />
                    <img
                        className="h-[350px] w-full rounded"
                        src={currentProduct?.image2}
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
