import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

type InitialState = {
  items: { id: string }[];
};

const initialState: InitialState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList: (state, action: PayloadAction<{ id: string }>) => {
      state.items.push({ id: action.payload.id });
    },
    removeFromWishList: (state, action: PayloadAction<{ id: string }>) => {
      state.items.forEach((item, i) => {
        if (item.id === action.payload.id) state.items.splice(i, 1);
      });
    },
  },
});

export const { addToWishList, removeFromWishList } = wishlistSlice.actions;
export const selectWishlist = (state: RootState) => state.wishlist;

export default wishlistSlice.reducer;
