import {
    FaRegArrowAltCircleRight,
    FaRegCalendarCheck,
    FaRegUser,
} from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { Link } from "react-router-dom";

const BlogCard = ({ item }) => {
    return (
        <div className="my-4">
            <img
                className="rounded h-[400px] w-full"
                src={item?.image}
                alt=""
            />

            <div className="mt-6">
                <p className="text-gray-500 text-sm my-2 flex items-center gap-2 mb-4">
                    <FaRegUser />
                    {item?.addedBy} <FaRegCalendarCheck /> {item?.date}{" "}
                    <MdOutlineCategory />
                    {item?.category}
                </p>
                <p className="flex items-center gap-2 text-sm my-2">
                    {item?.tags?.map((tag) => (
                        <p className="bg-gray-500 px-2 py-1 rounded-full text-white">
                            {tag}
                        </p>
                    ))}
                </p>
            </div>
            <h1 className="text-2xl font-bold my-4">{item?.title}</h1>
            <p className="text-gray-500 mb-4">{item?.excerpt}</p>
            <Link
                to={`/blog/${item?._id}`}
                className="p-1 font-bold flex items-center gap-2 w-max border-b-2 border-gray-200"
            >
                Read More <FaRegArrowAltCircleRight />
            </Link>
        </div>
    );
};

export default BlogCard;
