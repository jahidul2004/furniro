import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
const Checkout = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const { cartProducts = [] } = location.state || {};
    const totalPrice = cartProducts.reduce((acc, item) => acc + item.price, 0);

    const handlePlaceOrder = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const company = form.company.value;
        const address = form.address.value;
        const city = form.city.value;
        const zip = form.zip.value;
        const phone = form.phone.value;
        const email = form.email.value;
        const additionalInfo = form.additionalInfo.value;
        const orderDetails = {
            primaryEmail: user?.email,
            name,
            company,
            address,
            city,
            zip,
            phone,
            email,
            additionalInfo,
            orderedProducts: cartProducts,
            totalPrice,
            discount: 0,
            paymentMethod: "cod",
            status: "pending",
            orderDate: new Date().toLocaleDateString(),
        };

        axios
            .post(
                "https://furniro-server-bay.vercel.app/addOrder",
                orderDetails
            )
            .then((response) => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Order placed successfully! Thanks for order with us.",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                });

                // Clear the cart after successful order placement
                localStorage.removeItem("cart");

                //Clear form
                form.reset();

                // Redirect to the order confirmation page or any other page
                window.location.href = "/myAccount";
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Order Failed!",
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2500,
                });
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
                <h1 className="text-3xl font-semibold">Checkout</h1>
                <p className="mt-2 font-semibold flex items-center">
                    Home <FaGreaterThan className="mx-3" /> Checkout
                </p>
            </div>
            {/* Header end */}

            {/* Main content */}
            <form
                onSubmit={handlePlaceOrder}
                className="w-[95%] md:container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8"
            >
                {/* User details */}
                <div className="border border-[#f9f0e7] rounded p-4">
                    <h1 className="text-2xl font-bold mb-4 bg-[#f9f0e7] p-4">
                        Billing Details
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Name *
                            </legend>
                            <input
                                required
                                type="text"
                                className="input"
                                placeholder="Full Name"
                                name="name"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Company Name
                            </legend>
                            <input
                                name="company"
                                type="text"
                                className="input"
                                placeholder="Company Name (Optional)"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Street Address *
                            </legend>
                            <input
                                required
                                name="address"
                                type="text"
                                className="input"
                                placeholder="Street Address"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Town/City *
                            </legend>
                            <input
                                required
                                name="city"
                                type="text"
                                className="input"
                                placeholder="Town/City"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your ZIP Code *
                            </legend>
                            <input
                                required
                                name="zip"
                                type="number"
                                className="input"
                                placeholder="ZIP Code"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Phone *
                            </legend>
                            <input
                                required
                                name="phone"
                                type="text"
                                className="input"
                                placeholder="Phone"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Email Address *
                            </legend>
                            <input
                                required
                                name="email"
                                type="email"
                                className="input"
                                placeholder="Email"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Any Additional Information?
                            </legend>
                            <input
                                name="additionalInfo"
                                type="text"
                                className="input"
                                placeholder="Additional Info"
                            />
                        </fieldset>
                    </div>
                </div>
                {/* User details end */}

                {/* Place order div */}
                <div>
                    <div className="bg-[#f9f0e7] p-2 md:p-4 text-left">
                        <h1 className="text-2xl font-bold">
                            Cart Total {totalPrice} TK
                        </h1>
                        <div>
                            {cartProducts?.map((product) => (
                                <div className="flex justify-between items-center mt-4">
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="rounded h-12 w-12">
                                                <img
                                                    src={
                                                        product?.images
                                                            ? product?.images[0]
                                                            : "Hello"
                                                    }
                                                    alt="Avatar Tailwind CSS Component"
                                                />
                                            </div>
                                        </div>
                                        <h1>{product?.title}</h1>
                                    </div>
                                    <span>{product?.price} TK</span>
                                </div>
                            ))}
                            <hr className="my-4 border" />
                            <div className="flex justify-between items-center font-semibold">
                                <span>Subtotal</span>
                                <span>{totalPrice} TK</span>
                            </div>
                            <div className="flex justify-between items-center font-semibold">
                                <span>Discount</span>
                                <span>0 TK</span>
                            </div>
                            <hr className="my-4 border" />
                            <div className="flex justify-between items-center font-semibold mb-4">
                                <span>Total</span>
                                <span>{totalPrice} TK</span>
                            </div>
                        </div>
                        <div className="border border-dashed border-warning rounded p-2">
                            <h1 className="font-semibold">
                                Select payment method
                            </h1>
                            <select
                                className="mt-2 select select-warning"
                                name=""
                                id=""
                            >
                                <option selected value="">
                                    Cash On Delivery
                                </option>
                                <option value="">Stripe</option>
                            </select>
                        </div>

                        <div className="flex gap-4 mt-4 w-max">
                            <button
                                type="submit"
                                className="btn bg-[#b98e2f] text-white w-max mx-auto border-none"
                            >
                                Place order {totalPrice}
                            </button>
                        </div>
                    </div>
                </div>
                {/* Place order div end */}
            </form>
            {/* Main content end */}
        </div>
    );
};

export default Checkout;
