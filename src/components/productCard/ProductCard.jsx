const ProductCard = ({ data }) => {
    console.log(data);
    return (
        <div className="bg-[#f4f5f7] relative">
            <div className="w-full h-[200px]">
                <img className="w-full h-full" src={data?.image} alt="" />
            </div>
            <div className="p-4">
                <h1 className="text-xl font-semibold">{data?.title}</h1>
                <p className="my-2 text-[#898989] font-semibold">
                    {data?.description}
                </p>

                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">$ {data?.price}</h3>
                    <button className="btn btn-sm mt-2 border-none shadow-none bg-[#2ec1ac] rounded-none text-white">
                        View Details
                    </button>
                </div>
            </div>
            {data?.isNew && (
                <div className="bg-[#2ec1ac] absolute top-2 right-2 p-2 w-[35px] h-[35px] flex justify-center items-center rounded-full">
                    <p className="text-white text-sm">New</p>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
