import CategoryCard from "../../../components/categoryCard/CategoryCard";
import bedroomImage from "../../../assets/categoryImage/bedroom.png";
import livingRoomImage from "../../../assets/categoryImage/living.png";
import diningRoomImage from "../../../assets/categoryImage/dining.png";
import ProductCard from "../../../components/productCard/ProductCard";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BrowseRange = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch("https://furniro-server-bay.vercel.app/allProducts")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="w-[95%] md:container mx-auto mb-20">
            <div className="text-center my-12">
                <h1 className="text-3xl font-bold text-gray-800">
                    Browse The Range
                </h1>
                <p className="mt-2 text-gray-600">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
                <CategoryCard title="Living" image={livingRoomImage} />
                <CategoryCard title="Dining" image={diningRoomImage} />
                <CategoryCard title="Bedroom" image={bedroomImage} />
            </div>

            <div className="text-center mb-10 mt-20">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Our Products
                </h1>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg text-[#b98e2f]"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {products.slice(0, 8).map((product) => (
                        <ProductCard data={product} key={product?._id} />
                    ))}
                </div>
            )}

            <div className="flex justify-center mt-12">
                <Link
                    to={"/shop"}
                    className="px-10 py-3 border border-[#b98e2f] text-[#b98e2f] font-bold hover:bg-[#b98e2f] hover:text-white transition-all duration-300 rounded-sm shadow-sm"
                >
                    Show More
                </Link>
            </div>
        </div>
    );
};

export default BrowseRange;
