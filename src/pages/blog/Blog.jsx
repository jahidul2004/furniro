import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { useEffect, useState } from "react";
import BlogCard from "../../components/blog/BlogCard";
import { Link } from "react-router-dom";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineSupportAgent } from "react-icons/md";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/allBlogs")
            .then((res) => res.json())
            .then((data) => {
                setBlogs(data);
            });
    }, []);
    return (
        <div>
            {/* Header */}
            <div
                style={{
                    backgroundImage: `url(${shopHeading})`,
                    width: "100%",
                }}
                className="h-[220px] w-full bg-cover flex flex-col justify-center items-center"
            >
                <h1 className="text-3xl font-semibold">Blog</h1>
                <p className="mt-2 font-semibold flex items-center">
                    Home <FaGreaterThan className="mx-3" /> Blog
                </p>
            </div>
            {/* Header end */}

            {/* Main content */}
            <div className="w-[95%] md:container mx-auto my-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
                {/* Blog Content */}
                <div className="flex flex-col gap-4 md:gap-8 md:col-span-2 order-2 md:order-1">
                    {blogs.map((item) => (
                        <BlogCard key={item.id} item={item}></BlogCard>
                    ))}
                </div>
                {/* Blog Content end */}

                {/* Navigation area start */}
                <div className="my-4 order-1 md:order-2">
                    <input
                        type="text"
                        className="input"
                        placeholder="Search Blog"
                    />

                    <div>
                        <h1 className="text-2xl font-bold my-3">Categories</h1>
                        <div className="text-gray-500 font-semibold flex flex-col gap-2">
                            <p>Craft: 12</p>
                            <p>Design: 16</p>
                            <p>Handmade: 0</p>
                            <p>Interior: 15</p>
                            <p>Wood: 6</p>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold my-3">Recent Post</h1>
                        <div className="flex flex-col gap-4 md:gap-8">
                            {blogs.map((blog) => (
                                <Link to={`/blog/${blog?._id}`}>
                                    <div className="flex items-center gap-4 cursor-pointer">
                                        <img
                                            className="w-[70px] h-[70px] rounded"
                                            src={blog?.image}
                                            alt=""
                                        />

                                        <div>
                                            <h1 className="font-bold">
                                                {blog?.title}
                                            </h1>
                                            <p className="text-gray-500">
                                                {blog?.date}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                {/* Navigation area start end */}
            </div>
            {/* Main content end */}

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

export default Blog;
