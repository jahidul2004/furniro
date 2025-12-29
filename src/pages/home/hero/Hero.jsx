import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

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
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-[600px] md:h-[750px] overflow-hidden flex items-center">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                        index === currentImageIndex
                            ? "opacity-100"
                            : "opacity-0"
                    }`}
                    style={{ backgroundImage: `url("${img}")` }}
                >
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            ))}

            <div className="container mx-auto px-4 relative z-10 flex justify-end">
                <div className="bg-[#fff3e3]/90 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl max-w-lg w-full transform transition-all hover:scale-[1.01] duration-300">
                    <span className="font-bold tracking-widest text-gray-800 uppercase text-sm">
                        New Arrival
                    </span>
                    <h1 className="text-[#b98e2f] text-4xl md:text-5xl font-bold leading-tight my-4">
                        Discover Our <br /> New Collection
                    </h1>
                    <p className="text-gray-600 mb-8 font-medium leading-relaxed">
                        Unveiling the latest addition to our Furniro lineup!
                        Explore a stunning range of cutting-edge designs,
                        crafted with precision and innovation.
                    </p>
                    <Link
                        to="/shop"
                        className="btn bg-[#b98e2f] hover:bg-[#a17b2a] text-white border-none rounded-none px-10 py-4 h-auto text-lg font-bold shadow-lg flex items-center gap-2 w-fit"
                    >
                        Buy Now <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Hero;
