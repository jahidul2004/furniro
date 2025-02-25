import CategoryCard from "../../../components/categoryCard/CategoryCard";
import bedroomImage from "../../../assets/categoryImage/bedroom.png";
import livingRoomImage from "../../../assets/categoryImage/living.png";
import diningRoomImage from "../../../assets/categoryImage/dining.png";

const BrowseRange = () => {
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
                <CategoryCard title="Living" image={livingRoomImage}></CategoryCard>
                <CategoryCard title="Dining" image={diningRoomImage}></CategoryCard>
                <CategoryCard title="Bedroom" image={bedroomImage}></CategoryCard>
            </div>
            {/* Category div end */}
        </div>
    );
};

export default BrowseRange;
