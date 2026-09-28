import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("cart") || "[]");

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: saved },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i.product === product._id);

      if (existing) existing.quantity += 1;
      else state.items.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    increase(state, action) {
      const item = state.items.find((i) => i.product === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    decrease(state, action) {
      const item = state.items.find((i) => i.product === action.payload);
      if (item) item.quantity -= 1;
      state.items = state.items.filter((i) => i.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    remove(state, action) {
      state.items = state.items.filter((i) => i.product !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cart");
    }
  }
});

export const { addToCart, increase, decrease, remove, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
