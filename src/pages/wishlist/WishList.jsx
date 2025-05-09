import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { useEffect, useState } from "react";
const WishList = () => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    console.log("Wishlist Products", wishlistProducts);
    useEffect(() => {
        const wishlistItems =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        setWishlistProducts(wishlistItems);
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
                        {wishlistProducts?.map((product) => (
                            <tr>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="rounded h-12 w-12">
                                                <img
                                                    src={
                                                        product?.images[0]
                                                            ? product?.images[0]
                                                            : "https://i.ibb.co/6H3xY0N/placeholder.png"
                                                    }
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{product?.title}</td>
                                <td>{product?.price} TK</td>
                                <td>
                                    <button className="btn btn-soft btn-warning">
                                        Add to cart
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Product List end */}
        </div>
    );
};

export default WishList;
