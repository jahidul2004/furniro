
const CategoryCard = ({title, image}) => {
    return (
        <div>
            <img className="rounded h-[400px] w-full object-cover" src={image} alt="" />
            <h1 className="text-2xl font-semibold text-center my-4">{title}</h1>
        </div>
    );
};

export default CategoryCard;