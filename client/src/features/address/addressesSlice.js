import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddresses = createAsyncThunk(
  "/addresses/fetchAddresses",
  async () => {
    const response = await axios.get(`https://major-project-1-phi.vercel.app/addresses`);

    return response.data;
  }
);

export const addressesSlice = createSlice({
  name: "addresses",
  initialState: {
    addresses: [],
    status: "idle",
    error: null,
    deliveryAddress: {},
  },
  reducers: {
    addAddress: (state, action) => {
      state.addresses = [...state.addresses, action.payload];
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address._id != action.payload
      );
    },
    setDeliveryAddress: (state, action) => {
      state.deliveryAddress = action.payload;
    },
    updateAddress: (state, action) => {
      const addressIndex = state.addresses.findIndex(
        (address) => (address._id = action.payload._id)
      );

      state.addresses[addressIndex] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddresses.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
      state.status = "success";
      state.deliveryAddress = action.payload[0];
    });
    builder.addCase(fetchAddresses.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const { addAddress, deleteAddress, updateAddress, setDeliveryAddress } =
  addressesSlice.actions;

export const addAddressAsync = createAsyncThunk(
  "/addresses/addAddress",
  async (address, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://major-project-1-phi.vercel.app/addresses",
        address,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      thunkAPI.dispatch(addAddress(data.address));
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateAddressAsync = createAsyncThunk(
  "/addresses/addAddress",
  async (addressData, thunkAPI) => {
    const { address, addressId } = addressData;

    try {
      const response = await axios.post(
        `https://major-project-1-phi.vercel.app/addresses/${addressId}`,
        address,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      thunkAPI.dispatch(updateAddress(data.address));
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteAddressAsync = createAsyncThunk(
  "/addresses/deleteAddress",
  async (address, thunkAPI) => {
    try {
      const response = await axios.delete(
        `https://major-project-1-phi.vercel.app/addresses/${address._id}`
      );

      const data = await response.data;
      thunkAPI.dispatch(deleteAddress(address._id));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
