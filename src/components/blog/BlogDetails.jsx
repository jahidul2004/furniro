import {
    FaGreaterThan,
    FaUser,
    FaCalendarAlt,
    FaTag,
    FaSearch,
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
} from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});
    const [recentBlogs, setRecentBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);

        fetch(`https://furniro-server-bay.vercel.app/blog/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBlog(data);
                setLoading(false);
            });

        fetch("https://furniro-server-bay.vercel.app/allBlogs")
            .then((res) => res.json())
            .then((data) => {
                setRecentBlogs(data.slice(0, 5));
            });
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-[#b98e2f]"></span>
            </div>
        );
    }

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
                        Blog Details
                    </h1>
                    <p className="font-medium flex items-center justify-center text-gray-800">
                        Home <FaGreaterThan className="mx-2 text-xs" /> Blog{" "}
                        <FaGreaterThan className="mx-2 text-xs" />{" "}
                        <span className="truncate max-w-[200px]">
                            {blog?.title}
                        </span>
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="mb-6">
                        <img
                            className="w-full h-[400px] md:h-[500px] object-cover rounded-xl shadow-sm"
                            src={blog?.image}
                            alt={blog?.title}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 md:gap-8 text-gray-400 text-sm mb-6">
                        <div className="flex items-center gap-2">
                            <FaUser className="text-[#b98e2f]" />
                            <span>{blog?.addedBy || "Admin"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-[#b98e2f]" />
                            <span>{blog?.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTag className="text-[#b98e2f]" />
                            <span>{blog?.category}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                        {blog?.title}
                    </h1>

                    <div className="text-gray-600 text-lg leading-relaxed text-justify space-y-6">
                        <p>{blog?.description}</p>

                        <div className="bg-[#f9f1e7] p-8 rounded-lg italic border-l-4 border-[#b98e2f] text-gray-700 font-medium my-8">
                            "Furniture must have personality as well as be
                            beautiful. It is the heart of any home, creating a
                            space that feels uniquely yours."
                        </div>

                        <p>
                            Creating a beautiful home is more than just buying
                            furniture; it's about curating a space that reflects
                            your personality. Whether you prefer modern
                            minimalism or classic elegance, every piece tells a
                            story. At Furniro, we ensure that story is one of
                            quality, comfort, and style.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-400 font-medium">
                                Tags:
                            </span>
                            <span className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-600">
                                Sofa
                            </span>
                            <span className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-600">
                                Cleaning
                            </span>
                            <span className="px-3 py-1 bg-gray-100 rounded text-sm text-gray-600">
                                Home
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400 font-medium">
                                Share:
                            </span>
                            <div className="flex gap-3">
                                <a
                                    href="#"
                                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#b98e2f] transition-colors"
                                >
                                    <FaFacebookF size={14} />
                                </a>
                                <a
                                    href="#"
                                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#b98e2f] transition-colors"
                                >
                                    <FaLinkedinIn size={14} />
                                </a>
                                <a
                                    href="#"
                                    className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#b98e2f] transition-colors"
                                >
                                    <FaTwitter size={14} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-10">
                    <div className="relative">
                        <input
                            type="text"
                            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#b98e2f] focus:ring-1 focus:ring-[#b98e2f] transition-all"
                            placeholder="Search..."
                        />
                        <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    </div>

                    <div className="pl-0 md:pl-4">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            Categories
                        </h3>
                        <ul className="space-y-4">
                            {[
                                "Crafts",
                                "Design",
                                "Handmade",
                                "Interior",
                                "Wood",
                            ].map((cat, i) => (
                                <li
                                    key={i}
                                    className="flex justify-between items-center group cursor-pointer text-gray-500 hover:text-[#b98e2f] transition-colors"
                                >
                                    <span>{cat}</span>
                                    <span className="text-sm text-gray-400">
                                        ({Math.floor(Math.random() * 10) + 1})
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="pl-0 md:pl-4">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                            Recent Posts
                        </h3>
                        <div className="flex flex-col gap-6">
                            {recentBlogs.map((item) => (
                                <Link
                                    to={`/blog/${item._id}`}
                                    key={item._id}
                                    className="flex items-center gap-4 group"
                                >
                                    <img
                                        className="w-20 h-20 rounded-lg object-cover group-hover:opacity-80 transition-opacity"
                                        src={item?.image}
                                        alt=""
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-sm leading-snug group-hover:text-[#b98e2f] transition-colors line-clamp-2">
                                            {item?.title}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {item?.date}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
