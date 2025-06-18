import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(
      "https://e-commerce-project-server-six.vercel.app/categories"
    );

    return response.data;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
    currentCategory: "",
  },
  reducers: {
  
  },

  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.status = "success";
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});


