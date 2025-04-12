import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { useEffect, useState } from "react";
import BlogCard from "../../components/blog/BlogCard";
import { Link } from "react-router-dom";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("blog.json")
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
            <div className="w-[95%] md:container mx-auto my-10 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {/* Blog Content */}
                <div className="flex flex-col gap-4 md:gap-8 md:col-span-2">
                    {blogs.map((item) => (
                        <BlogCard key={item.id} item={item}></BlogCard>
                    ))}
                </div>
                {/* Blog Content end */}

                {/* Navigation area start */}
                <div>
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
                        <div className="flex flex-col gap-2 md:gap-4">
                            <div className="flex items-center gap-2 cursor-pointer">
                                <img
                                    className="w-[70px] h-[70px] rounded"
                                    src="https://i.ibb.co.com/HT3LH0tb/Eco-Rowe.jpg"
                                    alt=""
                                />

                                <div>
                                    <h1 className="text-xl font-bold">
                                        Wooden Craft Handmade
                                    </h1>
                                    <p>
                                        Not sure what furniture fits your vibe?
                                    </p>
                                    <p className="text-gray-500">12/10/2025</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <img
                                    className="w-[70px] h-[70px] rounded"
                                    src="https://i.ibb.co.com/vCY8SFLm/Customized-Living-Room-Furniture-Raleigh-NC.jpg"
                                    alt=""
                                />

                                <div>
                                    <h1 className="text-xl font-bold">
                                        Wooden Craft Handmade
                                    </h1>
                                    <p>
                                        Not sure what furniture fits your vibe?
                                    </p>
                                    <p className="text-gray-500">12/10/2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Navigation area start end */}
            </div>
            {/* Main content end */}
        </div>
    );
};

export default Blog;
