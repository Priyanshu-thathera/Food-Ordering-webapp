import React, { useEffect } from "react";
import CartProductList from "../components/CartProductList";
import { useSelector } from "react-redux";
import emptyCartImage from "../assests/empty.gif";
import { Link } from "react-router-dom";

const Cart = () => {
  const productCartItem = useSelector((state) => state.product.cartItem) ; // extracting all product added in cart
    
  const totalPrice = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = productCartItem.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  return (
    <>
      <div className="px-12 py-4">
        <header className="  md:px-40 ">
          <h2 className="text-lg rounded p-2 w-full text-center bg-red-400 md:text-2xl font-bold  my-2 text-slate-700">
            Your Cart Items
          </h2>
        </header>

        {productCartItem[0] ? (
          <div className="md:mx-40 gap-3">
            {/* diaplay items */}
            <div>
              {productCartItem.map((el) => {
                return (
                  <CartProductList
                    key={el._id}
                    _id={el._id}
                    name={el.name}
                    image={el.image}
                    category={el.category}
                    qty={el.qty}
                    price={el.price}
                    total={el.total}
                  />
                );
              })}
            </div>

            {/* for total list of cart items */}
            <div className="w-full mt-4">
              <h2 className="bg-blue-500 text-white p-2 rounded text-lg">Summary</h2>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Qty :</p>
                <p className="ml-auto w-32 font-bold">{totalQty}</p>
              </div>
              <div className="flex w-full py-2 text-lg border-b">
                <p>Total Price</p>
                <p className="ml-auto w-32 font-bold">
                  <span className="text-red-500 ">₹</span> {totalPrice}
                </p>
              </div>
              <button
                className="bg-red-500 w-full rounded text-lg font-bold py-2 text-white" /*onClick={handlePayment}*/
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex w-full justify-center items-center flex-col">
              <img src={emptyCartImage} className="w-full max-w-sm" />
              <p className="text-slate-500 text-3xl font-bold pt-2">
                Empty Cart
              </p>
              <Link to={"/"}>
                <button className=" bg-red-500 text-2xl rounded p-3 mt-4 font-bold">
                  Add item to cart
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
