import { FaRegCalendarCheck, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogCard = ({ item }) => {
    return (
        <div className="my-4">
            <img
                className="rounded h-[350px] w-full"
                src={item?.image}
                alt=""
            />

            <div>
                <p className="text-gray-500 text-sm my-2 mt-6 flex items-center gap-2 mb-4">
                    <FaRegUser />
                    {item?.author} <FaRegCalendarCheck /> {item?.date}
                </p>
                <p className="flex items-center gap-2 text-sm my-2">
                    {item?.tags?.map((tag) => (
                        <p className="bg-gray-500 px-2 py-1 rounded-full text-white">
                            {tag}
                        </p>
                    ))}
                </p>
            </div>
            <h1 className="text-2xl font-bold my-4 mt-6">{item?.title}</h1>
            <p className="text-gray-500 mb-4">{item?.excerpt}</p>
            <Link className="border-b-2 border-gray-500 p-1 font-bold">
                Read More
            </Link>
        </div>
    );
};

export default BlogCard;
