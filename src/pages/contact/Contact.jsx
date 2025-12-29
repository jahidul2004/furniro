import React from "react";
import {
    FaClock,
    FaGreaterThan,
    FaPhone,
    FaMapMarkerAlt,
    FaEnvelope,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaQuestionCircle,
} from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
import Swal from "sweetalert2";

const Contact = () => {
    const handleContact = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;

        Swal.fire({
            title: `Thank You ${name}!`,
            text: "We have received your message. Our team will get back to you shortly.",
            icon: "success",
            confirmButtonColor: "#b98e2f",
            confirmButtonText: "Close",
        });

        form.reset();
    };

    return (
        <div className="bg-white">
            <div
                style={{
                    backgroundImage: `url(${shopHeading})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                className="relative h-[250px] w-full flex flex-col justify-center items-center text-center"
            >
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Contact Us
                    </h1>
                    <p className="font-medium flex items-center justify-center text-gray-800">
                        Home <FaGreaterThan className="mx-2 text-xs" /> Contact
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-1 space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-[#b98e2f] text-white p-4 rounded-full shadow-md">
                                <FaMapMarkerAlt size={22} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Address
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    16/C-D, Noorjahan Road, Bashbari,
                                    Mohammadpur, Dhaka-1207
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-[#b98e2f] text-white p-4 rounded-full shadow-md">
                                <FaPhone size={22} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Phone
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Mobile: +(84) 546-6789 <br />
                                    Hotline: +(84) 456-6789
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-[#b98e2f] text-white p-4 rounded-full shadow-md">
                                <FaClock size={22} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Working Time
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    Monday-Friday: 9:00 - 22:00 <br />
                                    Saturday-Sunday: 9:00 - 21:00
                                </p>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="text-lg font-bold text-gray-800 mb-4">
                                Follow Us
                            </h4>
                            <div className="flex gap-4">
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#b98e2f] hover:text-white transition-all duration-300"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#b98e2f] hover:text-white transition-all duration-300"
                                >
                                    <FaTwitter />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#b98e2f] hover:text-white transition-all duration-300"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#b98e2f] hover:text-white transition-all duration-300"
                                >
                                    <FaLinkedinIn />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Send Us A Message
                            </h3>
                            <form
                                onSubmit={handleContact}
                                className="space-y-6"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">
                                            Your Name
                                        </label>
                                        <input
                                            required
                                            name="name"
                                            type="text"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                            placeholder="Abc"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-600">
                                            Email Address
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                            placeholder="abc@def.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600">
                                        Subject
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all"
                                        placeholder="This is an optional"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-600">
                                        Message
                                    </label>
                                    <textarea
                                        required
                                        className="w-full px-4 py-3 h-32 rounded-lg bg-gray-50 border border-gray-200 focus:border-[#b98e2f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#b98e2f] transition-all resize-none"
                                        placeholder="Hi! I'd like to ask about..."
                                    ></textarea>
                                </div>

                                <button className="w-full md:w-auto px-8 py-3 bg-[#b98e2f] hover:bg-[#a17b2a] text-white font-bold rounded-lg transition-all duration-300 shadow-md transform active:scale-95">
                                    Submit Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full h-[400px] bg-gray-200">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.0000000000005!2d90.3625!3d23.7565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c6bec4f2093b%3A0x3e67c27abd123456!2sShyamoli%20Ideal%20Polytechnic%20Institute%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{
                        border: 0,
                        filter: "grayscale(100%) contrast(1.2) opacity(0.8)",
                    }}
                    allowFullScreen=""
                    loading="lazy"
                ></iframe>
            </div>

            <div className="bg-gray-50 py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-8 flex items-center justify-center gap-2">
                        <FaQuestionCircle className="text-[#b98e2f]" />{" "}
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-2">
                                How long does shipping take?
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Usually, our shipping takes 3-5 business days
                                within the city and 7-10 days for international
                                orders.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-2">
                                Can I return my product?
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Yes, we offer a 30-day return policy if the
                                product is damaged or does not match the
                                description.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-2">
                                Do you provide custom furniture?
                            </h4>
                            <p className="text-gray-600 text-sm">
                                Absolutely! You can contact our support team to
                                discuss custom dimensions and materials.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-gray-800 mb-2">
                                Is payment secure?
                            </h4>
                            <p className="text-gray-600 text-sm">
                                We use SSL encryption and trusted payment
                                gateways to ensure your transaction is 100%
                                secure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
