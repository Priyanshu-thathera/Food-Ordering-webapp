import React, { useRef } from "react";
import { useSelector } from "react-redux";
import CardFeature from "../components/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import AllProducts from "../components/AllProducts";
import { Link } from "react-router-dom";
import home from "../assests/home.jpg";

const Home = () => {
  const productData = useSelector((state) => state.product.productList); // taking all data of product from database
  const homeProductCartListVege = productData.filter(
    (el) => el.category === "vegetable",
    []
  ); // vegetable list

  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <>
      <div className="p-4 md:p-6" style={{backgroundImage: `url(${home})`, minHeight:"40rem"}} >
        {/* left part */}
        <div className="md:w-3/5">
          <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
              className="h-7"
            />
          </div>

          <h2 className="text-4xl md:text-7xl font-bold py-3">
            The Fastest Delivery in{" "}
            <span className="text-red-600 text-">Your Home</span>
          </h2>

          <p className="py-3 text-xl ">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.Lorem Ipsum is simply dummy text of the printing
            and typesetting industry. 
          </p>
          <Link to={"menu/" + productData[0]?._id}>
            <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
              Order Now
            </button>
          </Link>
        </div>
        </div>

 <div className="p-2 md:p-4">
      <div>
        <div className="flex w-full items-center">
          <h2 className="font-bold text-2xl text-slate-800 mb-4">
            Fresh Vegetables
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              onClick={preveProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
            >
              <GrPrevious />
            </button>
            <button
              onClick={nextProduct}
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
            >
              <GrNext />
            </button>
          </div>
        </div>

        <div
          className="flex gap-4 overflow-scroll scrollbar-none"
          ref={slideProductRef}
        >
          {homeProductCartListVege[0]
            ? homeProductCartListVege.map((el) => {
                return (
                  <CardFeature
                    key={el._id}
                    _id={el._id}
                    name={el.name}
                    category={el.category}
                    price={el.price}
                    image={el.image}
                  />
                );
              })
            : loadingArrayFeature.map((el, index) => {
                // if image data take time to load
                return <CardFeature key={index} loading={"Loading...."} />;
              })}
        </div>
      </div>
      <AllProducts Heading={"Other Products"} />
    </div>
    </>
  );
};

export default Home;
