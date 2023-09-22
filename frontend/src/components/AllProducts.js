import React, { useState, useEffect } from "react";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";
import { useSelector } from "react-redux";
import { isAction } from "@reduxjs/toolkit";

const AllProducts = ({ Heading }) => {
  const productData = useSelector((state) => state.product.productList); // extracting entire data
  const categoryList = [...new Set(productData.map((el) => el.category))]; // list for category present in productdata

  //filter data display
  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  return (
    <div>
      {/* ///////// filter product on click */}
      <div className="my-5">
        <h2 className="font-bold text-2xl text-slate-800 mb-4">{Heading}</h2>
        <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
          {categoryList[0] &&
            categoryList.map((el) => {
              return (
                <FilterProduct
                  key={el}
                  isActive={el === filterby}
                  category={el}
                  onClick={() => handleFilterProduct(el)}
                />
              );
            })}
        </div>
      </div>

      <div className=" flex flex-wrap justify-center gap-4 my-4">
        {dataFilter.map((el) => {
          return (
            <CardFeature
              key={el._id}
              _id={el._id}
              image={el.image}
              name={el.name}
              category={el.category}
              price={el.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
