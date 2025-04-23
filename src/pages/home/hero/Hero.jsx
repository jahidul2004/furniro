import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
    const images = [
        "https://i.ibb.co.com/qFWn8JfB/furniture-styles-Getty-Images-1467984982-512fed4077b646eabbc187619554d517.jpg",
        "https://i.ibb.co.com/0j9W53Qy/15824-177906.jpg",
        "https://i.ibb.co.com/Xr5MCRyN/hero1.jpg",
        "https://i.ibb.co.com/XkrTy93T/modern-img.webp",
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % images.length
            );
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="hero h-[550px] transition-all duration-1000 ease-in-out"
            style={{
                backgroundImage: `url("${images[currentImageIndex]}")`,
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
                    <Link
                        to={"/shop"}
                        className="rounded btn mt-2 bg-[#ba8d2f] text-white border-none shadow-none px-5"
                    >
                        Buy Now!
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
