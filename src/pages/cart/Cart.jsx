import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { CiCircleRemove } from "react-icons/ci";
import { MdOutlineSupportAgent } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { HiOutlineTrophy } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartProducts(cart);
    }, []);

    const handleRemoveFromCart = (productId) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCartProducts(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product removed from cart",
            showConfirmButton: false,
            timer: 2500,
            toast: true,
        });
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
                <h1 className="text-3xl font-semibold">Cart</h1>
                <p className="mt-2 font-semibold flex items-center">
                    Home <FaGreaterThan className="mx-3" /> Cart
                </p>
            </div>
            {/* Header end */}

            <div className="w-[95%] md:container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                {/* Product list */}
                <div className="col-span-2">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead className="bg-[#f9f0e7] text-black">
                                <tr>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartProducts.map((product) => (
                                    <tr>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="rounded h-12 w-12">
                                                        <img
                                                            src={product?.image}
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{product?.title}</td>
                                        <td>{product?.price}</td>
                                        <td>1</td>
                                        <td>25000TK</td>
                                        <td>
                                            <CiCircleRemove
                                                onClick={() => {
                                                    handleRemoveFromCart(
                                                        product?.id
                                                    );
                                                }}
                                                className="font-bold cursor-pointer text-[#b98e2f]"
                                                size={30}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Product list end */}

                {/* Checkout div */}
                <div className="bg-[#f9f0e7] p-2 md:p-4">
                    <h1 className="text-2xl font-bold text-center">
                        Cart Total({cartProducts?.length})
                    </h1>

                    <div className="flex flex-col gap-4 mt-4 text-center">
                        <span>Subtotal: 25000</span>
                        <span>Total: 25000</span>
                        <Link
                            to={"/checkout"}
                            className="btn bg-[#b98e2f] text-white w-max mx-auto border-none"
                        >
                            Checkout
                        </Link>
                    </div>
                </div>
                {/* Checkout div end */}
            </div>

            {/* Feature card start */}
            <div className="bg-[#f9f0e7]">
                <div className="w-[95%] md:container mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="flex items-center gap-2">
                        <HiOutlineTrophy size={60} />
                        <div>
                            <h1 className="text-xl font-bold">High Quality</h1>
                            <p className="font-semibold text-[#898989]">
                                Crafted from top materials
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoShieldCheckmarkOutline size={60} />
                        <div>
                            <h1 className="text-xl font-bold">
                                Warranty Protection
                            </h1>
                            <p className="font-semibold text-[#898989]">
                                Over 2 years
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <TbTruckDelivery size={60} />
                        <div>
                            <h1 className="text-xl font-bold">Free shipping</h1>
                            <p className="font-semibold text-[#898989]">
                                Order over 150 $
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdOutlineSupportAgent size={60} />
                        <div>
                            <h1 className="text-xl font-bold">24/7 support</h1>
                            <p className="font-semibold text-[#898989]">
                                With your team
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Feature card end */}
        </div>
    );
};

export default Cart;
