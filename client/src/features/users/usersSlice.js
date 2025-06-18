import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("/users/fetchUsers", async () => {
  const response = await axios.get(
    "https://major-project-1-phi.vercel.app/users"
  );

  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    error: null,
    status: "idle",
    isUserLoggedIn: false,
    deliveryAddress: {},
    loggedInUser: {
      cart: [],
      wishlist: [],
    },
  },
  reducers: {
    addLoggedInUser: (state, action) => {
      state.isUserLoggedIn = true;
      state.loggedInUser = action.payload;
    },
    updateWishlist: (state, action) => {
      const productIndex = state.loggedInUser.wishlist.findIndex(
        (product) => product == action.payload.product
      );

      if (productIndex == -1) {
        state.loggedInUser.wishlist = [
          ...state.loggedInUser.wishlist,
          action.payload.product,
        ];
      } else {
        state.loggedInUser.wishlist = state.loggedInUser.wishlist.filter(
          (product) => product != action.payload.product
        );
      }
    },
    moveToWishlist: (state, action) => {
      const productIndex = state.loggedInUser.wishlist.findIndex(
        (product) => product == action.payload.product
      );

      if (productIndex == -1) {
        state.loggedInUser.wishlist = [
          ...state.loggedInUser.wishlist,
          action.payload.product,
        ];
      }

      state.loggedInUser.cart = state.loggedInUser.cart.filter(
        (product) =>
          !(
            product.product === action.payload.product &&
            product.size === action.payload.size
          )
      );
    },
    addToCart: (state, action) => {
      const productIndex = state.loggedInUser.cart.findIndex(
        (product) =>
          product.product == action.payload.product &&
          product.size == action.payload.size
      );

      if (productIndex == -1) {
        state.loggedInUser.cart = [...state.loggedInUser.cart, action.payload];
      } else {
        state.loggedInUser.cart[productIndex].quantity +=
          action.payload.quantity;
      }
    },
    removeFromCart: (state, action) => {
      state.loggedInUser.cart = state.loggedInUser.cart.filter(
        (product) =>
          !(
            product.product === action.payload.product &&
            product.size === action.payload.size
          )
      );
    },
    quantityIncrement: (state, action) => {
      const itemIndex = state.loggedInUser.cart.findIndex(
        (item) =>
          item.product == action.payload.product &&
          item.size == action.payload.size
      );

      state.loggedInUser.cart[itemIndex].quantity += 1;
    },
    quantityDecrement: (state, action) => {
      const itemIndex = state.loggedInUser.cart.findIndex(
        (item) =>
          item.product == action.payload.product &&
          item.size == action.payload.size
      );

      if (state.loggedInUser.cart[itemIndex].quantity != 1) {
        state.loggedInUser.cart[itemIndex].quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.loggedInUser.cart = [];
    },
    addNewUser: (state, action) => {
      state.users = [...state.users, action.payload];
    },
    logoutUser: (state) => {
      state.loggedInUser = { cart: [], wishlist: [] };
      state.isUserLoggedIn = false;
    },
    updateUserData: (state, action) => {
      if (!Object.hasOwn(action.payload, "password")) {
        const { firstName, lastName, email, phone } = action.payload;
        state.loggedInUser.firstName = firstName;
        state.loggedInUser.lastName = lastName;
        state.loggedInUser.email = email;
        state.loggedInUser.phone = phone;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "success";
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "error";
      state.error = action.payload;
    });
  },
});

export const {
  addLoggedInUser,
  updateWishlist,
  addToCart,
  removeFromCart,
  quantityIncrement,
  quantityDecrement,
  moveToWishlist,
  clearCart,
  addNewUser,
  updateUserData,
  logoutUser,
} = usersSlice.actions;

export const moveToWishlistAsync = createAsyncThunk(
  "/users/moveToWishlist",
  async (productData, thunkAPI) => {
    try {
      const { loggedInUser, isUserLoggedIn } = thunkAPI.getState().users;

      if (isUserLoggedIn) {
        const response = await axios.post(
          `https://major-project-1-phi.vercel.app/users/${loggedInUser._id}/wishlist`,
          productData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.data;

      }

      thunkAPI.dispatch(moveToWishlist(productData));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const pushLoggedInUserDataAsync = createAsyncThunk(
  "/user/loggedIn",
  (userData, thunkAPI) => {
    const { token } = userData;
    axios
      .post(`https://major-project-1-phi.vercel.app/users/loggedIn`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) =>
        thunkAPI.dispatch(addLoggedInUser(response.data.user))
      )
      .catch((error) => {});
  }
);

export const updateWishlistAsync = createAsyncThunk(
  "/users/updateWishlist",
  async (product, thunkAPI) => {
    try {
      const { isUserLoggedIn, loggedInUser } = thunkAPI.getState().users;

      if (isUserLoggedIn) {
        const response = await axios.post(
          `https://major-project-1-phi.vercel.app/users/${loggedInUser._id}/wishlist`,
          product,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.data;
        thunkAPI.dispatch(updateWishlist(product));
      } else {
        thunkAPI.dispatch(updateWishlist(product));
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addToCartAsync = createAsyncThunk(
  "/users/updateCart",
  async (productData, thunkAPI) => {
    try {
      const { loggedInUser, isUserLoggedIn } = thunkAPI.getState().users;

      if (isUserLoggedIn) {
        const response = await axios.post(
          `http://localhost:8000/users/${loggedInUser._id}/cart`,
          productData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.data;
      }

      thunkAPI.dispatch(addToCart(productData));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFromCartAsync = createAsyncThunk(
  "/users/removeFromCart",

  async (productData, thunkAPI) => {
    try {
      const { isUserLoggedIn, loggedInUser } = thunkAPI.getState().users;

      if (isUserLoggedIn) {
        const response = await axios.delete(
          `https://major-project-1-phi.vercel.app/users/${loggedInUser._id}/cart`,
          {
            data: productData,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.data;
      }

      thunkAPI.dispatch(removeFromCart(productData));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const quantityIncrementAsync = createAsyncThunk(
  "/users/incrementQuantity",
  async (productData, thunkAPI) => {
    try {
      const { isUserLoggedIn, loggedInUser } = thunkAPI.getState().users;

      if (isUserLoggedIn) {
        const response = await axios.post(
          `https://major-project-1-phi.vercel.app/users/${loggedInUser._id}/cart/increment`,
          productData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.data;

      }

      thunkAPI.dispatch(quantityIncrement(productData));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const quantityDecrementAsync = createAsyncThunk(
  "/users/decrementQuantity",
  async (productData, thunkAPI) => {
    try {
      const { isUserLoggedIn, loggedInUser } = thunkAPI.getState().users;

      if (isUserLoggedIn) {
        const response = await axios.post(
          `https://major-project-1-phi.vercel.app/users/${loggedInUser._id}/cart/decrement`,
          productData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.data;

      }

      thunkAPI.dispatch(quantityDecrement(productData));
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addNewUserAsync = createAsyncThunk(
  "/users/addNewUser",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post(
        "https://major-project-1-phi.vercel.app/users",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      thunkAPI.dispatch(addNewUser(data.user));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserDataAsync = createAsyncThunk(
  "/user/updateUserData",
  async (userData, thunkAPI) => {
    try {
      const { loggedInUser } = thunkAPI.getState().users;

      const response = await axios.post(
        `https://major-project-1-phi.vercel.app/users/${loggedInUser._id}`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      thunkAPI.dispatch(updateUserData(data.user));
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearCartAsync = createAsyncThunk(
  "/users/clearCart",
  async (userData, thunkAPI) => {
    try {
      const { loggedInUser } = thunkAPI.getState().users;

      const response = await axios.post(
        `https://major-project-1-phi.vercel.app/users/${loggedInUser._id}/cart/clear`,{},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;

      thunkAPI.dispatch(clearCart());
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
