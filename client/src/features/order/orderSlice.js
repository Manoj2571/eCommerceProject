import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { clearCartAsync } from "../users/usersSlice";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(
    "https://e-commerce-project-server-six.vercel.app/orders"
  );

  return response.data;
});

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
    isOrderPlaced: false,
    cartTotal: 0,
    latestOrderId: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.status = "error";
      state.orders = action.payload;
    });
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
      state.isOrderPlaced = true;
    },
    setCartTotal: (state, action) => {
      state.cartTotal = action.payload;
    },
    updateLatestOrderId: (state, action) => {
      state.latestOrderId = action.payload;
      state.isOrderPlaced = true;
    },
  },
});

export const { addOrder, setCartTotal, updateLatestOrderId } =
  orderSlice.actions;

export const addOrderAsync = createAsyncThunk(
  "/orders/addOrder",
  async (order, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://e-commerce-project-server-six.vercel.app/orders",
        order,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      console.log(data);
      // thunkAPI.dispatch(addOrder(data.order));
      thunkAPI.dispatch(updateLatestOrderId(data.order._id));
    } catch (error) {
      console.log(error);
    }
  }
);
