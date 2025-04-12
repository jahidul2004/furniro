import { FaGreaterThan } from "react-icons/fa";
import shopHeading from "../../assets/pageHeading/shopHeading.png";
const About = () => {
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
                <h1 className="text-3xl font-semibold">About</h1>
                <p className="mt-2 font-semibold flex items-center">
                    Home <FaGreaterThan className="mx-3" /> About
                </p>
            </div>
            {/* Header end */}

            {/* About Content */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image */}
                <div>
                    <img
                        src={"https://i.ibb.co.com/Xr5MCRyN/hero1.jpg"}
                        alt="About Furniro"
                        className="rounded-2xl shadow-lg w-full"
                    />
                </div>

                {/* Text */}
                <div>
                    <h2 className="text-4xl font-bold mb-6 text-gray-800">
                        Discover the Heart of Furniro
                    </h2>
                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        Welcome to <strong>Furniro</strong> — your trusted
                        destination for stylish, durable, and affordable
                        furniture. We believe your living spaces should reflect
                        your personality, comfort, and lifestyle. Our curated
                        collections bring elegance and functionality together to
                        turn your house into a home.
                    </p>
                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        Founded with a passion for craftsmanship and design,
                        Furniro works with skilled local artisans and top
                        manufacturers to ensure every product meets the highest
                        quality standards. From cozy sofas to modern workspaces,
                        our furniture is designed to elevate every corner of
                        your life.
                    </p>
                    <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                        Our mission is to make furniture shopping easy,
                        enjoyable, and accessible. With a seamless online
                        experience, secure payments, reliable delivery, and
                        dedicated customer support, we’re here to help you
                        furnish your dream home without the hassle.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        At Furniro, we don't just sell furniture — we craft
                        experiences, inspire creativity, and help you build
                        spaces that truly feel like yours. Join thousands of
                        satisfied customers and explore the beauty of better
                        living with us.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
