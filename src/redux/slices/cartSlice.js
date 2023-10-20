import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
};

const getTotalPrice = (state) => state.items.reduce((sum, obj) => {
  return obj.price * obj.count + sum;
}, 0)

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const checkPizza = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.types === action.payload.types &&
          obj.sizes === action.payload.sizes
      );
      checkPizza
        ? checkPizza.count++
        : state.items.push({ ...action.payload, count: 1 });
        state.totalPrice = getTotalPrice(state);
    },
    removeProduct: (state, action) => {
      const count = state.items
        .filter((obj) => obj.id === action.payload.id)
        .filter((obj) => obj.types === action.payload.types)
        .filter((obj) => obj.sizes === action.payload.sizes);
      count.map((i) => {
        state.items = state.items.filter((obj) => obj !== i);
      });
      state.totalPrice = getTotalPrice(state);
    },
    clearCart: (state, action) => {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem: (state, action) => {
      const checkPizza = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.types === action.payload.types &&
          obj.sizes === action.payload.sizes
      );
      checkPizza.count > 1 && checkPizza.count--;
      state.totalPrice = getTotalPrice(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, clearCart, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
