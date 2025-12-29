import BrowseRange from "./BrowseRange/BrowseRange";
import Hero from "./hero/Hero";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-white">
            <Hero />

            <BrowseRange />

            <div className="py-16 bg-[#fcf8f3]">
                <div className="text-center mb-8">
                    <p className="text-gray-600 font-semibold">
                        Share your setup with
                    </p>
                    <h2 className="text-4xl font-bold text-[#3a3a3a]">
                        #FurniroFurniture
                    </h2>
                </div>

                <div className="w-full overflow-hidden px-2 md:px-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
                        <div className="flex flex-col gap-4 mt-10 md:mt-20">
                            <img
                                src="https://i.ibb.co.com/2Ydq53KR/resident.png"
                                className="w-full h-60 object-cover rounded-lg hover:scale-105 transition duration-500 shadow-md"
                                alt="Setup 1"
                            />
                            <img
                                src="https://i.ibb.co.com/ksyW9M7x/dining.jpg"
                                className="w-full h-40 object-cover rounded-lg hover:scale-105 transition duration-500 shadow-md"
                                alt="Setup 2"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <img
                                src="https://i.ibb.co.com/fV9v5vMj/director-Table.jpg"
                                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition duration-500 shadow-md"
                                alt="Setup 3"
                            />
                            <img
                                src="https://i.ibb.co/zh8tG31F/kitchen.jpg"
                                className="w-full h-80 object-cover rounded-lg hover:scale-105 transition duration-500 shadow-md"
                                alt="Setup 4"
                            />
                        </div>
                        <div className="flex flex-col gap-4 mt-8">
                            <img
                                src="https://i.ibb.co/zh8tG31F/kitchen.jpg"
                                className="w-full h-72 object-cover rounded-lg hover:scale-105 transition duration-500 shadow-md"
                                alt="Setup 5"
                            />
                            <img
                                src="https://i.ibb.co.com/qFWn8JfB/furniture-styles-Getty-Images-1467984982-512fed4077b646eabbc187619554d517.jpg"
                                className="w-full h-56 object-cover rounded-lg hover:scale-105 transition duration-500 shadow-md"
                                alt="Setup 6"
                            />
                        </div>
                        <div className="flex flex-col gap-4 md:mt-16">
                            <img
                                src="https://i.ibb.co.com/0j9W53Qy/15824-177906.jpg"
                                className="w-full h-64 object-cover rounded-lg hover:scale-105 transition duration-500 shadow-md"
                                alt="Setup 7"
                            />
                            <img
                                src="https://i.ibb.co.com/XkrTy93T/modern-img.webp"
                                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition duration-500 shadow-md"
                                alt="Setup 8"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
