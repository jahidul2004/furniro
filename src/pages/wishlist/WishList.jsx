import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const WishList = () => {
    const [wishlistProducts, setWishlistProducts] = useState([]);
    console.log("Wishlist Products", wishlistProducts);
    useEffect(() => {
        const wishlistItems =
            JSON.parse(localStorage.getItem("wishlist")) || [];

        setWishlistProducts(wishlistItems);
    }, []);

    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added to cart",
            showConfirmButton: false,
            timer: 2500,
            toast: true,
        });
    };

    const handleRemoveFromWishlist = (product) => {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const updatedWishlist = wishlist.filter(
            (item) => item._id !== product._id
        );

        setWishlistProducts(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };
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
                                    <button
                                        onClick={() => {
                                            handleAddToCart(product);
                                            handleRemoveFromWishlist(product);
                                        }}
                                        className="btn btn-soft btn-warning"
                                    >
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
