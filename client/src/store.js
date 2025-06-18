import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "./features/products/productsSlice";
import { categoriesSlice } from "./features/categories/categoriesSlice";
import { addressesSlice } from "./features/address/addressesSlice";
import { usersSlice } from "./features/users/usersSlice";
import { orderSlice } from "./features/order/orderSlice";

const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    categories: categoriesSlice.reducer,
    addresses: addressesSlice.reducer,
    users: usersSlice.reducer,
    orders: orderSlice.reducer,
  },
});

export default store;
