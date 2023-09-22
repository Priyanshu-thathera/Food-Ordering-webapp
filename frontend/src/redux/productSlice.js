import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  productList: [],
  cartItem: localStorage.getItem('cartItem')
  ? JSON.parse(localStorage.getItem('cartItem'))
  : [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct: (state, action) => {
      state.productList = [...action.payload]; // Update the productList when new product is uploaded
    },
    addCartItem: (state, action) => {
      const itemPresent = state.cartItem.some((el) => {
        const isPresent = el._id === action.payload._id;
        return isPresent;
      });

      if (itemPresent) {
        toast("Item is already in cart");
      } else {
        toast("Item added successfully");
        const total = action.payload.price.replace(/[^0-9]/g, "");
        state.cartItem = [
          ...state.cartItem,
          { ...action.payload, qty: 1, total: total },
        ]; // Update the cart list when product is added to cart

        // save cart item to local storage so that on refreshing page data will not disappear
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      }
    },

    deleteCartItem: (state, action) => {
      toast("Item is deleted");
      // delete item from the cart list when product is removed from cart
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      state.cartItem.splice(index, 1);

      // delete from local storage
      let storageCartItem = JSON.parse(localStorage.getItem("cartItem"));
      let products = storageCartItem.filter(
        (product) => product._id !== action.payload
      );
      localStorage.setItem("cartItem", JSON.stringify(products));
      
    },

    increaseQty: (state, action) => {
      
      const index = state.cartItem.findIndex((el) => {
        return el._id === action.payload;
      });

      let qty = state.cartItem[index].qty;
      const qtyInc = ++qty;
      state.cartItem[index].qty = qtyInc;
      console.log(index);
      const price = state.cartItem[index].price.replace(/[^0-9]/g, "");
      const total = price.replace(/[^0-9]/g, "") * qtyInc;

      state.cartItem[index].total = total;
      
      // update local storage
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },

    decreaseQty: (state, action) => {
      const index = state.cartItem.findIndex((el) => el._id === action.payload);
      let qty = state.cartItem[index].qty;
      if (qty > 1) {
        const qtyDec = --qty;
        state.cartItem[index].qty = qtyDec;
        console.log(index);
        const price = state.cartItem[index].price.replace(/[^0-9]/g, "");
        const total = price.replace(/[^0-9]/g, "") * qtyDec; // replace for only number

        state.cartItem[index].total = total;

        // update local storage
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      }
    },
  },
});

export const {
  setDataProduct,
  addCartItem,
  deleteCartItem,
  increaseQty,
  decreaseQty,
} = productSlice.actions;
export default productSlice.reducer;
