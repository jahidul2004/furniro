import CategoryCard from "../../../components/categoryCard/CategoryCard";
import bedroomImage from "../../../assets/categoryImage/bedroom.png";
import livingRoomImage from "../../../assets/categoryImage/living.png";
import diningRoomImage from "../../../assets/categoryImage/dining.png";
import ProductCard from "../../../components/productCard/ProductCard";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const BrowseRange = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("/products.json")
            .then((response) => response.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <div className="w-[95%] md:container mx-auto">
            {/* Header div */}
            <div className="text-center my-5 md:my-8">
                <h1 className="text-3xl font-semibold">Browse The Range</h1>
                <p className="mt-2 text-[#3a3838]">
                    Browse the category with your own range.
                </p>
            </div>
            {/* Header div end */}

            {/* Category div */}
            <div className="grid grid-cols1 md:grid-cols-3 gap-4 md:gap-8">
                <CategoryCard
                    title="Living"
                    image={livingRoomImage}
                ></CategoryCard>
                <CategoryCard
                    title="Dining"
                    image={diningRoomImage}
                ></CategoryCard>
                <CategoryCard
                    title="Bedroom"
                    image={bedroomImage}
                ></CategoryCard>
            </div>
            {/* Category div end */}

            {/* Products Card */}
            <div className="my-10">
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                    {products.map((product) => (
                        <ProductCard
                            data={product}
                            key={product.id}
                        ></ProductCard>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <Link
                        to={"/shop"}
                        className="btn btn-outline border-[#b98e2f] text-[#b98e2f]"
                    >
                        Show All Products
                    </Link>
                </div>
            </div>
            {/* Products Card end */}
        </div>
    );
};

export default BrowseRange;
