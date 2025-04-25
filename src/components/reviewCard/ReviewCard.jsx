import { Star } from "lucide-react";

const ReviewCard = ({ data }) => {
    return (
        <div className="text-left bg-white shadow-md rounded-2xl p-5 flex flex-col gap-4 max-w-md mx-auto">
            {/* Reviewer Info */}
            <div className="flex items-center gap-4">
                <img
                    src={data?.reviewerImage}
                    alt={data?.reviewerName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-300"
                />
                <div>
                    <h3 className="text-lg font-semibold">
                        {data?.reviewerName}
                    </h3>
                    <p className="text-sm text-gray-500">{data?.date}</p>
                </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                    <Star
                        key={i}
                        size={18}
                        className={
                            i < Math.round(data?.rating)
                                ? "text-yellow-500"
                                : "text-gray-300"
                        }
                        fill={i < Math.round(data?.rating) ? "#FBBF24" : "none"}
                    />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                    ({data?.rating})
                </span>
            </div>

            {/* Review Message */}
            <p className="text-gray-700 text-sm">{data?.reviewMessage}</p>
        </div>
    );
};

export default ReviewCard;
