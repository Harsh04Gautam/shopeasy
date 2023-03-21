import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, TProduct } from "../index";

type InitialState = {
  items: { id: string; count: number }[];
  checkout: {
    totalItems: number;
    subtotal: number;
    diliveryFee: number;
    discount: number;
    total: number;
  };
};

const initialState: InitialState = {
  items: [],
  checkout: {
    totalItems: 0,
    subtotal: 0,
    diliveryFee: 0,
    discount: 20,
    total: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: TProduct; count?: number }>
    ) => {
      const item = state.items.find(
        (item) => item?.id === action.payload?.product.id
      );
      if (item) {
        item.count += action.payload.count || 1;
      } else {
        state.items.push({
          id: action.payload.product.id,
          count: action.payload.count || 1,
        });
      }
      state.checkout.totalItems += action.payload.count || 1;
      state.checkout.subtotal +=
        action.payload.product.price * (action.payload.count || 1);
      state.checkout.total =
        (state.checkout.subtotal * (100 - state.checkout.discount)) / 100;
    },

    decreseFromCart: (state, action: PayloadAction<{ product: TProduct }>) => {
      state.items.forEach((item, i) => {
        if (item?.id === action.payload?.product?.id) {
          item.count--;
          state.checkout.subtotal -= action.payload.product.price;
          if (item.count === 0) state.items.splice(i, 1);
        }
      });
      state.checkout.totalItems--;
      state.checkout.total =
        (state.checkout.subtotal * (100 - state.checkout.discount)) / 100;
    },
    removeFromCart: (state, action: PayloadAction<{ product: TProduct }>) => {
      state.items.forEach((item, i) => {
        if (item?.id === action.payload?.product?.id) {
          state.checkout.totalItems -= item.count;
          state.checkout.subtotal -= action.payload.product.price * item.count;
          state.items.splice(i, 1);
        }
      });
      state.checkout.total =
        (state.checkout.subtotal * (100 - state.checkout.discount)) / 100;
    },
  },
});

export const { addToCart, decreseFromCart, removeFromCart } = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
