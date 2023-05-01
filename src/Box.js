import React from "react";

const Box = ({ value, handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="flex justify-center items-center     bg-[#3b329a] rounded-xl text-5xl text-white  font-bold"
    >
      {value}
    </div>
  );
};

export default Box;
