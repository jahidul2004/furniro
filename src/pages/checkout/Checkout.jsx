import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { Link } from "react-router-dom";
const Checkout = () => {
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
            <div className="w-[95%] md:container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* User details */}
                <div>
                    <h1 className="text-2xl font-bold mb-4 bg-[#f9f0e7] p-4">
                        Billing Details
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Name
                            </legend>
                            <input
                                required
                                type="text"
                                className="input"
                                placeholder="Full Name"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Company Name
                            </legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Company Name (Optional)"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Street Address
                            </legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Street Address"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Town/City
                            </legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Town/City"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your ZIP Code
                            </legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="ZIP Code"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Phone
                            </legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Phone"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Enter Your Email Address
                            </legend>
                            <input
                                type="text"
                                className="input"
                                placeholder="Email"
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend text-[16px]">
                                Any Additional Information?
                            </legend>
                            <input
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
                    <div className="bg-[#f9f0e7] p-2 md:p-4">
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
                                Place order
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Place order div end */}
            </div>
            {/* Main content end */}
        </div>
    );
};

export default Checkout;
