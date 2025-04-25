import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
    return (
        <div className="bg-[#f4f5f7] relative rounded">
            <div className="w-full h-[200px]">
                <img
                    className="w-full h-full rounded-t"
                    src={data?.image}
                    alt=""
                />
            </div>
            <div className="p-4">
                <h1 className="text-xl font-semibold">{data?.title}</h1>
                <p className="my-2 text-[#898989] font-semibold">
                    {data?.shortDescription}
                </p>

                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">$ {data?.price}</h3>
                    <Link
                        to={`/shop/${data?.id}`}
                        className="rounded btn btn-sm mt-2 border-none shadow-none bg-[#b98e2f] text-white"
                    >
                        View Details
                    </Link>
                </div>
            </div>
            {data?.isNew && (
                <div className="bg-[#b98e2f] absolute top-2 right-2 p-2 w-[35px] h-[35px] flex justify-center items-center rounded-full">
                    <p className="text-white text-sm">New</p>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
