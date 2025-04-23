import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import Swal from "sweetalert2";
import userIcon from "../../assets/accountProfile/user.png";
import { Link } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";

const MyAccount = () => {
    const { user, logout } = useContext(AuthContext);
    console.log(user);
    return (
        <div className="w-[95%] md:container mx-auto my-10 grid gird-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Profile area */}
            <div>
                <div className="w-full h-[400px] shadow-lg rounded-lg p-4 border-t-16 border-[#b98e2f]">
                    <img
                        className="w-full h-full rounded"
                        src={
                            user?.photoURL
                                ? user.photoURL
                                : "https://i.ibb.co.com/0D15PXH/Whats-App-Image-2024-01-15-at-21-28-37-d3e60b3a.png"
                        }
                        alt=""
                    />
                </div>

                <div className="my-5 text-center shadow-lg rounded-lg p-4 py-6 bg-[#b98e2f] text-white">
                    <h1 className="text-3xl font-bold mb-2">
                        {user?.displayName}
                    </h1>
                    <p className="mb-4">{user?.email}</p>
                    <div className="flex justify-center items-center gap-1">
                        <button
                            onClick={() => {
                                logout()
                                    .then(() => {
                                        console.log("Logout successful");
                                        Swal.fire({
                                            title: "Success",
                                            text: "Logout successful",
                                            icon: "success",
                                            confirmButtonText: "Close",
                                        });
                                    })
                                    .catch((error) => {
                                        console.error(
                                            "Logout error:",
                                            error.message
                                        );
                                        Swal.fire({
                                            title: "Error!",
                                            text: error.message,
                                            icon: "error",
                                            confirmButtonText: "Close",
                                        });
                                    });
                            }}
                            className="btn bg-white text-[#b98e2f] border-none shadow-none"
                        >
                            Logout
                        </button>
                        <Link
                            to={"/shop"}
                            className="btn bg-white shadow-none border-none text-[#b98e2f]"
                        >
                            Shop
                        </Link>
                    </div>
                </div>
            </div>
            {/* Profile area end */}

            {/* Action area */}
            <div className="col-span-1 md:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                    {/* row 1 */}
                                    <tr>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="rounded h-12 w-12">
                                                        <img
                                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Zemlak, Daniel and Leannon</td>
                                        <td>2500</td>
                                        <td>1</td>
                                        <td>25000TK</td>
                                        <td>
                                            <CiCircleRemove
                                                className="font-bold cursor-pointer text-[#b98e2f]"
                                                size={30}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="rounded h-12 w-12">
                                                        <img
                                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                            alt="Avatar Tailwind CSS Component"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>Zemlak, Daniel and Leannon</td>
                                        <td>2500</td>
                                        <td>1</td>
                                        <td>25000TK</td>
                                        <td>
                                            <CiCircleRemove
                                                className="font-bold cursor-pointer text-[#b98e2f]"
                                                size={30}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Product list end */}

                    {/* Checkout div */}
                    <div className="bg-[#f9f0e7] p-2 md:p-4 w-full">
                        <h1 className="text-2xl font-bold text-center">
                            Cart Total
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
            </div>
            {/* Action area end */}
        </div>
    );
};

export default MyAccount;
