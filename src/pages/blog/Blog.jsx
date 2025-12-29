import { FaGreaterThan, FaSearch, FaCalendarAlt } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { useEffect, useState } from "react";
import BlogCard from "../../components/blog/BlogCard";
import { Link } from "react-router-dom";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import {
    MdNotInterested,
    MdOutlineCategory,
    MdOutlineSupportAgent,
} from "react-icons/md";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [blogCount, setBlogCount] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch(
                "https://furniro-server-bay.vercel.app/blogCategoryCount"
            ).then((res) => res.json()),
            fetch("https://furniro-server-bay.vercel.app/allBlogs").then(
                (res) => res.json()
            ),
        ])
            .then(([countData, blogsData]) => {
                setBlogCount(countData);
                setBlogs(blogsData);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div className="bg-white">
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
                        Blog
                    </h1>
                    <p className="font-medium flex items-center justify-center text-gray-800">
                        Home <FaGreaterThan className="mx-2 text-xs" /> Blog
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 my-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 order-2 lg:order-1">
                    {loading ? (
                        <div className="flex justify-center items-center h-60">
                            <span className="loading loading-spinner loading-lg text-[#b98e2f]"></span>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-10">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((item) => (
                                    <BlogCard key={item._id} item={item} />
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center bg-gray-50 border border-gray-200 rounded-xl py-16">
                                    <MdNotInterested
                                        className="text-gray-400 mb-4"
                                        size={60}
                                    />
                                    <h2 className="text-2xl font-bold text-gray-700">
                                        No Blog Found
                                    </h2>
                                    <p className="text-gray-500 mt-2">
                                        We couldn’t find any articles matching "
                                        {searchText}"
                                    </p>
                                    <button
                                        onClick={() => setSearchText("")}
                                        className="mt-6 text-[#b98e2f] font-bold hover:underline"
                                    >
                                        Clear Search
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {!loading && filteredBlogs.length > 0 && (
                        <div className="flex justify-center md:justify-end gap-4 mt-12">
                            <button className="w-12 h-12 rounded bg-[#b98e2f] text-white font-bold transition-all hover:bg-[#a17b2a]">
                                1
                            </button>
                            <button className="w-12 h-12 rounded bg-[#f9f1e7] text-gray-800 font-bold transition-all hover:bg-[#b98e2f] hover:text-white">
                                2
                            </button>
                            <button className="w-12 h-12 rounded bg-[#f9f1e7] text-gray-800 font-bold transition-all hover:bg-[#b98e2f] hover:text-white">
                                3
                            </button>
                            <button className="px-6 h-12 rounded bg-[#f9f1e7] text-gray-800 font-bold transition-all hover:bg-[#b98e2f] hover:text-white">
                                Next
                            </button>
                        </div>
                    )}
                </div>

                <div className="order-1 lg:order-2 space-y-10">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b98e2f] focus:ring-1 focus:ring-[#b98e2f] transition-all"
                            placeholder="Search..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    </div>

                    <div className="bg-white pl-4 md:pl-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            Categories
                        </h3>
                        <ul className="space-y-4">
                            {blogCount?.map((item) => (
                                <li
                                    key={item._id}
                                    className="flex justify-between items-center group cursor-pointer"
                                >
                                    <span className="text-gray-500 group-hover:text-[#b98e2f] transition-colors font-medium">
                                        {item._id}
                                    </span>
                                    <span className="text-gray-400 group-hover:text-[#b98e2f] text-sm">
                                        ({item.count})
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pl-4 md:pl-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            Recent Posts
                        </h3>
                        <div className="flex flex-col gap-6">
                            {blogs.slice(0, 5).map((blog) => (
                                <Link
                                    to={`/blog/${blog?._id}`}
                                    key={blog._id}
                                    className="group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-20 overflow-hidden rounded-lg flex-shrink-0">
                                            <img
                                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                src={blog?.image}
                                                alt={blog?.title}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h4 className="font-bold text-gray-800 leading-snug group-hover:text-[#b98e2f] transition-colors line-clamp-2">
                                                {blog?.title}
                                            </h4>
                                            <p className="text-xs text-gray-400 flex items-center gap-1">
                                                <FaCalendarAlt /> {blog?.date}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#f9f1e7] py-16">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="flex items-center gap-4 group cursor-default">
                        <div className="text-6xl text-gray-800 group-hover:text-[#b98e2f] transition-colors duration-300">
                            <HiOutlineTrophy />
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

export default Blog;
