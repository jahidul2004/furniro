import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
const BlogDetails = () => {
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
                    <FaGreaterThan className="mx-3" /> Wooden Craft
                </p>
            </div>
            {/* Header end */}
        </div>
    );
};

export default BlogDetails;
