import { FaClock, FaGreaterThan, FaPhone } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import { FaLocationDot } from "react-icons/fa6";

const Contact = () => {
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
                <h1 className="text-3xl font-semibold">Contact</h1>
                <p className="mt-2 font-semibold flex items-center">
                    Home <FaGreaterThan className="mx-3" /> Contact
                </p>
            </div>
            {/* Header end */}

            {/* Main content start */}
            <div className="my-10 w-[95%] md:container mx-auto">
                {/* Header area start */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Get In Touch With Us</h1>
                    <p className="text-[#9f9f9f] mt-4">
                        For More Information About Our Product & Services.
                        Please Feel Free To Drop Us An Email. <br /> Our Staff
                        Always Be There To Help You Out. Do Not Hesitate!
                    </p>
                </div>
                {/* Header area start end */}

                {/* Address and contact form start */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 mt-12">
                    {/* Address area start */}
                    <div className="flex justify-center">
                        <div className="w-max flex flex-col gap-4 md:gap-6">
                            {/* Address */}
                            <div>
                                <span className="flex items-center gap-2">
                                    <FaLocationDot size={23} />
                                    <h1 className="text-xl font-bold">
                                        Address
                                    </h1>
                                </span>
                                <p className="text-[#9f9f9f] mt-2">
                                    236 5th SE Avenue, <br /> New York NY10000,
                                    United States
                                </p>
                            </div>
                            {/* Address */}

                            {/* Phone */}
                            <div>
                                <span className="flex items-center gap-2">
                                    <FaPhone size={23} />
                                    <h1 className="text-xl font-bold">Phone</h1>
                                </span>
                                <p className="text-[#9f9f9f] mt-2">
                                    Mobile: +(84) 546-6789 <br /> Hotline: +(84)
                                    456-6789
                                </p>
                            </div>
                            {/* Phone */}

                            {/* Working Time */}
                            <div>
                                <span className="flex items-center gap-2">
                                    <FaClock size={23} />
                                    <h1 className="text-xl font-bold">
                                        Working Time
                                    </h1>
                                </span>
                                <p className="text-[#9f9f9f] mt-2">
                                    Monday-Friday: 9:00 - 22:00 <br />{" "}
                                    Saturday-Sunday: 9:00 - 21:00
                                </p>
                            </div>
                            {/* Working Time */}
                        </div>
                    </div>
                    {/* Address area end */}

                    {/* Contact form start */}
                    <div className="flex justify-center">
                        <div className="w-[90%] md:w-[80%]">
                            <form action="">
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        Your Name
                                    </legend>
                                    <input
                                        type="text"
                                        className="input w-full md:w-[80%]"
                                        placeholder="Enter Your Name"
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        Your Email
                                    </legend>
                                    <input
                                        type="email"
                                        className="input w-full md:w-[80%]"
                                        placeholder="Enter Your Email"
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        Subject
                                    </legend>
                                    <input
                                        type="text"
                                        className="input w-full md:w-[80%]"
                                        placeholder="Subject"
                                    />
                                </fieldset>
                                <fieldset className="fieldset">
                                    <legend className="fieldset-legend">
                                        Message
                                    </legend>
                                    <textarea
                                        className="textarea h-24 w-full md:w-[80%]"
                                        placeholder="Enter Your Message"
                                    ></textarea>
                                </fieldset>
                                <button className="btn bg-[#b98e2f] text-white border-none outline-none w-full md:w-[80%] mt-4">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    {/* Contact form end */}
                </div>
                {/* Address and contact form end */}
            </div>
            {/* Main content end */}
        </div>
    );
};

export default Contact;
