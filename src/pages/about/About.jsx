import React from "react";
import {
    FaGreaterThan,
    FaShippingFast,
    FaHeadset,
    FaLeaf,
    FaAward,
    FaUsers,
    FaSmile,
    FaCheckCircle,
} from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";

const About = () => {
    return (
        <div className="bg-white">
            {/* --- Header Section --- */}
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
                        About Furniro
                    </h1>
                    <p className="font-medium flex items-center justify-center text-gray-800">
                        Home <FaGreaterThan className="mx-2 text-xs" /> About
                    </p>
                </div>
            </div>

            {/* --- Brand Story Section --- */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative group">
                        <div className="absolute -top-4 -left-4 w-full h-full border-4 border-[#b98e2f] rounded-2xl z-0 hidden md:block"></div>
                        <img
                            src={"https://i.ibb.co.com/Xr5MCRyN/hero1.jpg"}
                            alt="About Furniro"
                            className="relative z-10 rounded-2xl shadow-2xl w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                        {/* Floating Experience Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block animate-fade-in-up">
                            <p className="text-[#b98e2f] font-bold text-4xl">
                                10+
                            </p>
                            <p className="text-gray-600 font-medium">
                                Years of Experience
                            </p>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div>
                        <h4 className="text-[#b98e2f] font-bold uppercase tracking-wide mb-2">
                            Who We Are
                        </h4>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-gray-800 leading-tight">
                            Discover the Heart of{" "}
                            <span className="text-[#b98e2f]">Furniro</span>
                        </h2>

                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Welcome to <strong>Furniro</strong> — your
                                trusted destination for stylish, durable, and
                                affordable furniture. We believe your living
                                spaces should reflect your personality, comfort,
                                and lifestyle.
                            </p>
                            <p>
                                Founded with a passion for craftsmanship and
                                design, Furniro works with skilled local
                                artisans and top manufacturers to ensure every
                                product meets the highest quality standards.
                                From cozy sofas to modern workspaces, our
                                furniture is designed to elevate every corner of
                                your life.
                            </p>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                                <li className="flex items-center gap-3">
                                    <FaCheckCircle className="text-[#b98e2f] flex-shrink-0" />{" "}
                                    Premium Quality Material
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaCheckCircle className="text-[#b98e2f] flex-shrink-0" />{" "}
                                    Modern & Classy Designs
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaCheckCircle className="text-[#b98e2f] flex-shrink-0" />{" "}
                                    24/7 Customer Support
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaCheckCircle className="text-[#b98e2f] flex-shrink-0" />{" "}
                                    Affordable Pricing
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Stats Section (New) --- */}
            <div className="bg-[#b98e2f] py-16">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
                    <div className="space-y-2">
                        <FaUsers className="text-5xl mx-auto opacity-80" />
                        <h3 className="text-4xl font-bold">15K+</h3>
                        <p className="text-white/80 font-medium">
                            Happy Customers
                        </p>
                    </div>
                    <div className="space-y-2">
                        <FaAward className="text-5xl mx-auto opacity-80" />
                        <h3 className="text-4xl font-bold">50+</h3>
                        <p className="text-white/80 font-medium">Awards Won</p>
                    </div>
                    <div className="space-y-2">
                        <FaShippingFast className="text-5xl mx-auto opacity-80" />
                        <h3 className="text-4xl font-bold">100%</h3>
                        <p className="text-white/80 font-medium">
                            On-Time Delivery
                        </p>
                    </div>
                    <div className="space-y-2">
                        <FaSmile className="text-5xl mx-auto opacity-80" />
                        <h3 className="text-4xl font-bold">98%</h3>
                        <p className="text-white/80 font-medium">
                            Positive Reviews
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Why Choose Us / Features Section (New) --- */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Why Shop With Us?
                    </h2>
                    <p className="text-gray-600">
                        We don't just sell furniture; we create experiences.
                        Here is why thousands of customers choose Furniro for
                        their homes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition duration-300 hover:-translate-y-2 border border-transparent hover:border-[#b98e2f]/20">
                        <div className="w-16 h-16 bg-[#b98e2f]/10 rounded-full flex items-center justify-center text-[#b98e2f] text-3xl mb-6">
                            <FaAward />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            High Quality
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Crafted from top materials ensuring durability and
                            elegance that lasts for generations.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition duration-300 hover:-translate-y-2 border border-transparent hover:border-[#b98e2f]/20">
                        <div className="w-16 h-16 bg-[#b98e2f]/10 rounded-full flex items-center justify-center text-[#b98e2f] text-3xl mb-6">
                            <FaLeaf />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            Sustainability
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            We use eco-friendly materials and sustainable
                            practices to protect our planet.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition duration-300 hover:-translate-y-2 border border-transparent hover:border-[#b98e2f]/20">
                        <div className="w-16 h-16 bg-[#b98e2f]/10 rounded-full flex items-center justify-center text-[#b98e2f] text-3xl mb-6">
                            <FaHeadset />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                            24/7 Support
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our dedicated support team is always ready to assist
                            you with any queries or issues.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- Newsletter Section (New) --- */}
            <div className="bg-gray-900 text-white py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Join Our Community
                    </h2>
                    <p className="text-gray-400 mb-8">
                        Subscribe to our newsletter to get updates on our latest
                        collections, promo codes, and furniture tips.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="px-6 py-4 rounded-lg text-gray-800 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-[#b98e2f]"
                        />
                        <button className="bg-[#b98e2f] text-white px-8 py-4 rounded-lg font-bold hover:bg-[#a17b2a] transition duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
