import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { useEffect, useState } from "react";
import BlogCard from "../../components/blog/BlogCard";

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
            <div className="w-[95%] md:container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Blog Content */}
                <div className="flex flex-col gap-4 md:gap-8">
                    {blogs.map((item) => (
                        <BlogCard key={item.id} item={item}></BlogCard>
                    ))}
                </div>
                {/* Blog Content end */}
            </div>
            {/* Main content end */}
        </div>
    );
};

export default Blog;
