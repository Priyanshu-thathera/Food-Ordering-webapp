import React from "react";
import { Link } from "react-router-dom";
import {useDispatch }from "react-redux"
import { addCartItem } from "../redux/productSlice";

const CardFeature = ({ image, name, category, price, loading ,_id }) => {
  const dispatch =useDispatch();
  
  const handleAddCartProduct = ()=>{
    
    dispatch(addCartItem({
      _id : _id,
      name : name,
      category :category,
      price : price ,
      image : image
    }))
  }

  return (
<div className="w-full min-w-[200px] max-w-[200px] bg-white rounded hover:shadow-lg drop-shadow-lg py-5 px-4 mb-2 cursor-pointer flex flex-col">
            
      {image ? (
        <>
        <Link to={`/menu/${_id}`} onClick={()=>window.scrollTo({top:0 ,behavior:"smooth"})}>
          <div className="h-24 flex flex-col justify-center items-center">
              <img src={image} className="h-full" />
            </div>

            <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
              {name}{" "}
            </h3>

            <p className=" text-slate-500  font-medium">{category}</p>

            <p className=" font-bold">
              <span className="text-red-500">₹</span>
              <span>{price}</span>
            </p>
            </Link>
            <button
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
              onClick={(handleAddCartProduct)}
            >
              Add to Cart
            </button>
            
          </>
      
      ) : (
        <div className="flex  min-h-[200px] justify-center items-center ">
          <p>{loading}</p>
        </div>
      )}
      </div>
  );
};

export default CardFeature;
