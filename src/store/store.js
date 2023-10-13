import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productslice";
import categoriesSlice from "./categoriesslice";

const store = configureStore({
  reducer: {
    product: productSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});

export default store;
