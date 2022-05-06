import React from "react";

const Card = ({ handleClick, cardContent }) => {
  return (
    <div
      className="relative border border-gray-300 rounded-xl px-5 py-3 min-h-max h-20 shadow-md"
      onClick={handleClick}
    >
      {cardContent}
    </div>
  );
};

export default Card;