import React, { useState } from "react";

function StarRating({ rating, setRating }) {
  const[hover, setHover] = useState(0);
  return (
    <div className="star-rating my-10">
      <p className="heading text-sm">Rate us</p>
      <div className="flex justify-between">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              key={index}
              type="button"
              className={index <= (hover || rating) ? "on" : "off"}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className="star text-xl">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default StarRating;
