import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const Stars = ({ stars }) => {
    const rating = Array.from({ length: 5 }, (ele, index) => {
        const fullStar = index + 1;
        const halfStar = index + 0.5;

        return (
            <span key={index}>
                {stars >= fullStar ? (
                    <FaStar className="text-yellow-500" />  // Fully filled star
                ) : stars >= halfStar ? (
                    <FaStarHalfAlt className="text-yellow-500" /> // Half-filled star
                ) : (
                    <FaRegStar className="text-yellow-500" />  // Empty star
                )}
            </span>
        );
    });

    return <div className="flex">{rating}</div>;
};

export default Stars;
