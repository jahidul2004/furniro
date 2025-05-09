import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { CiCircleRemove } from "react-icons/ci";
const WishList = () => {
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
                <h1 className="text-3xl font-semibold">WishList</h1>
                <p className="mt-2 font-semibold flex items-center">
                    Home <FaGreaterThan className="mx-3" /> WishList
                </p>
            </div>
            {/* Header end */}

            {/* Product List */}

            <div className="overflow-x-auto w-[95%] md:container mx-auto my-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#f9f0e7] text-black">
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="rounded h-12 w-12">
                                            <img
                                                src={
                                                    "https://i.ibb.co/7g3JY0C/Rectangle-1.png"
                                                }
                                                alt="Avatar Tailwind CSS Component"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>Hello Product</td>
                            <td>1200</td>
                            <td>
                                <button className="btn btn-soft btn-warning">Add to cart</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Product List end */}
        </div>
    );
};

export default WishList;
