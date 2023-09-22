import React from "react";
import { CiForkAndKnife } from "react-icons/ci";
// ${isActive ? "bg-red-600 text-white" : 
const FilterProduct = ({category,onClick,isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`md:text-3xl md:p-5 text-xl p-3 rounded-full cursor-pointer ${isActive ? "bg-red-500" : "bg-yellow-500"} `}>
        <CiForkAndKnife/>
      </div>
      <p className="text-center md:font-medium font-normal my-1 capitalize">{category}</p>
    </div>
  );
};

export default FilterProduct;
