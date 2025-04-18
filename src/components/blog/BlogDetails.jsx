import { FaGreaterThan, FaRegUser } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LuClock4 } from "react-icons/lu";
const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({});

    useEffect(() => {
        fetch("/blog.json")
            .then((res) => res.json())
            .then((data) => {
                setBlog(data.find((item) => item.id == id));
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
                <h1 className="text-3xl font-semibold">Blog Details</h1>
                <p className="mt-2 font-semibold flex items-center">
                    Home <FaGreaterThan className="mx-3" /> Blog{" "}
                    <FaGreaterThan className="mx-3" /> {blog?.title}
                </p>
            </div>
            {/* Header end */}

            {/* Details */}
            <div className="w-[95%] md:container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <div>
                    <img
                        className="w-full h-[400px] rounded"
                        src={blog?.image}
                        alt=""
                    />
                </div>

                <div>
                    <p className="text-gray-500 flex items-center gap-2 mb-2">
                        <FaRegUser />
                        {blog?.author} <LuClock4 />
                        {blog?.date}
                    </p>
                    <h1 className="text-3xl font-bold mb-4">{blog?.title}</h1>
                    <p>{blog?.content}</p>
                </div>
            </div>
            {/* Details end */}
        </div>
    );
};

export default BlogDetails;
