import { useEffect, useState } from "react";
import { FaGreaterThan, FaRegHeart } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { BsCartPlus } from "react-icons/bs";
import ReactStars from "react-stars";

const ProductDetails = () => {
    const currentId = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [currentProduct, setCurrentProduct] = useState({});
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`https://furniro-server-bay.vercel.app/product/${currentId?.id}`)
            .then((res) => res.json())
            .then((data) => {
                setCurrentProduct(data);
            });
    }, [currentId]);

    useEffect(() => {
        fetch(`https://furniro-server-bay.vercel.app/reviews/${currentId?.id}`)
            .then((res) => res.json())
            .then((data) => {
                setReviews(data);
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

    const handleAddToWishlist = (product) => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        wishlist.push(product);

        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added to wishlist",
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
                        className="rounded w-full h-[400px] object-cover"
                        src={
                            currentProduct?.images
                                ? currentProduct?.images[0]
                                : "https://i.ibb.co/7g0J3qY/Rectangle-1.png"
                        }
                        alt=""
                    />
                </div>
                {/* Image area end */}

                {/* Description area */}
                <div>
                    <h1 className="text-4xl font-bold">
                        {currentProduct?.title}
                    </h1>
                    <p className="mt-2 font-semibold text-gray-400">
                        {currentProduct?.shortDescription}
                    </p>
                    <p className="my-2 text-xl font-semibold text-[#9f9f9f]">
                        BDT-{currentProduct?.price} TK
                    </p>
                    <p className="my-2">⭐⭐⭐⭐⭐ | 5 Reviews</p>
                    <p>{currentProduct?.descriptgion}</p>

                    <div>
                        <h1 className="text-lg font-bold my-2">Features</h1>
                        <ul className="list-disc list-inside">
                            {currentProduct?.features?.map((feature) => (
                                <li>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center gap-4 mt-4">
                        <button
                            onClick={() => {
                                handleAddToCart(currentProduct);
                            }}
                            className="btn btn-soft btn-info"
                        >
                            Add To Cart <BsCartPlus />
                        </button>
                        <button
                            onClick={() => {
                                handleAddToWishlist(currentProduct);
                            }}
                            className="btn btn-soft btn-warning"
                        >
                            Add To Wishlist <FaRegHeart />
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

                    <TabPanel className="my-10 text-justify">
                        <p className="text-justify text-[#9f9f9f]">
                            {currentProduct?.description}
                        </p>
                    </TabPanel>
                    <TabPanel>
                        <div className="my-10 text-justify">
                            <p className="text-gray-400">
                                {currentProduct?.additionalInfo}
                            </p>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                            {reviews?.map((review) => (
                                <div className="relative bg-[#fefaef] border border-dashed border-warning rounded-xl p-6 md:p-8 flex flex-col gap-4 shadow-sm hover:shadow-md transition duration-300 ease-in-out">
                                    <div className="flex items-center gap-4">
                                        <img
                                            className="w-16 h-16 border-2 border-warning rounded-full object-cover p-2"
                                            src={review?.userPhoto}
                                            alt={review?.userName}
                                        />
                                        <div className="flex-1">
                                            <h2 className="text-xl text-left font-semibold text-gray-800">
                                                {review?.userName}
                                            </h2>
                                            <ReactStars
                                                count={5}
                                                value={review?.rating}
                                                size={22}
                                                edit={false}
                                                color2="#fbbf24" // Tailwind amber-400 like
                                            />
                                        </div>
                                    </div>

                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed text-justify">
                                        {review?.reviewMessage}
                                    </p>

                                    <span className="absolute bottom-2 right-4 text-xs text-gray-500">
                                        {review?.date}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </TabPanel>
                </Tabs>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <img
                        className="h-[350px] w-full rounded"
                        src={
                            currentProduct?.images
                                ? currentProduct?.images[0]
                                : "https://i.ibb.co/7g0J3qY/Rectangle-1.png"
                        }
                        alt=""
                    />
                    <img
                        className="h-[350px] w-full rounded"
                        src={
                            currentProduct?.images
                                ? currentProduct?.images[1]
                                : "https://i.ibb.co/7g0J3qY/Rectangle-1.png"
                        }
                        alt=""
                    />
                </div>
            </div>

            {/* Additional data end */}

            {/* Related products */}
            <div className="my-10">
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
