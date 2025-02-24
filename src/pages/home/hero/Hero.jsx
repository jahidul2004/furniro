import { Link } from "react-router-dom";
import hero1 from "../../../assets/images/hero1.jpeg";
const Hero = () => {
    return (
        <div
            className="hero h-[500px]"
            style={{
                backgroundImage: `url(${hero1})`,
            }}
        >
            <div className="hero-overlay opacity-10"></div>
            <div className="hero-content text-neutral-content text-center grid grid-cols-1 md:grid-cols-2">
                <div></div>
                <div className="max-w-md bg-[#fff3e3] rounded text-left text-black p-4">
                    <p className="text-lg font-semibold text-[#3b3b3b]">
                        New Arrival
                    </p>
                    <h1 className="my-1 leading-12 text-3xl md:text-4xl font-bold text-[#ba8d2f]">
                        Discover our new collection
                    </h1>
                    <p className="font-semibold text-sm text-[#4b4848]">
                        Unveiling the latest addition to our Furion lineup!
                        Explore a stunning range of cutting-edge designs,
                        crafted with precision and innovation.
                    </p>
                    <Link className="cursor-pointer btn mt-2 bg-[#ba8d2f] text-white border-none shadow-none rounded-none px-5">
                        Buy Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
