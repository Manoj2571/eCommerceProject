import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "/products/fetchProducts",
  async () => {
    const response = await axios.get(
      "https://major-project-1-phi.vercel.app/products"
    );

    return response.data;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    sortBy: "",
    search: "",
    alertMessage: "",
    orderCart: [],
  },
  reducers: {
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    updateSearchInput: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state, action) => {
      state.search = "";
    },
    setAlertMessage: (state, action) => {
      state.alertMessage = action.payload;
    },
    updateOrderCart: (state, action) => {
      state.orderCart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "success";
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const {
  setSortBy,
  updateSearchInput,
  clearSearch,
  setAlertMessage,
  updateOrderCart,
} = productsSlice.actions;

export const updateProductStockAsync = createAsyncThunk(
  "/products/updateProductStock",
  async (cart) => {
    console.log("check stock", cart);
    try {
      const response = await axios.post(
        "https://major-project-1-phi.vercel.app/products/productStockDecrement",
        cart,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
