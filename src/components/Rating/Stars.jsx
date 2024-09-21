import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";

const Stars = ({ stars }) => {
    const rating = Array.from({ length: 5 }, (ele, index) => {
        const fullStar = index + 1;
        const halfStar = index + 0.5;

        return (
            <span key={index}>
                {stars >= fullStar ? (
                    <FaStar className="text-yellow-500" />  
                ) : stars >= halfStar ? (
                    <FaStarHalfAlt className="text-yellow-500" /> 
                ) : (
                    <FaRegStar className="text-yellow-500" />  
                )}
            </span>
        );
    });

    return <div className="flex">{rating}</div>;
};

export default Stars
