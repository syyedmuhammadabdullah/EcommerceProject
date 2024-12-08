import React from "react";
import { StarFilled } from "@ant-design/icons";

const StarRating = ({ rating, size,length=5,onClick=()=>{} }) => {
  const fullStars = Math.floor(rating);
  const fraction = rating - fullStars;
  const clipPathPercentage = fraction * 100;

  return (
    <div className="star-rating flex gap-xxs">
      {Array.from({ length }).map((_, index) => {
        const starIndex = index + 1;

        if (starIndex <= fullStars) {
          return <StarFilled key={index} className= {`${size} text-yellow-400`}  onClick={() => onClick(starIndex)}/>;
        }

        if (starIndex === fullStars + 1) {
          return (
            <div
              key={index}
              className="relative inline-block"
            >
              <StarFilled className= {`${size} text-gray-300`}  onClick={() => onClick(starIndex)}/>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: `polygon(0 0, ${clipPathPercentage}% 0, ${clipPathPercentage}% 100%, 0% 100%)`,
                }}
              >
                <StarFilled className= {`${size} text-yellow-400`}  />
              </div>
            </div>
          );
        }

        return <StarFilled key={index} className= {`${size} text-gray-300`}  onClick={() => onClick(starIndex)} />;
      })}
    </div>
  );
};

export default StarRating;


