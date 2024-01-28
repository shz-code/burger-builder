import { createSlice } from "@reduxjs/toolkit";

const ingredientPrices = {
  salad: 20,
  cheese: 40,
  meat: 90,
};

const initialState = {
  ingredients: [
    { type: "salad", amount: 0 },
    { type: "cheese", amount: 0 },
    { type: "meat", amount: 0 },
  ],
  totalPrice: 80,
};

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const newState = state.ingredients.map((item) => {
        if (item.type === action.payload.type) {
          return { ...item, amount: item.amount + 1 };
        } else return { ...item };
      });
      state.totalPrice += ingredientPrices[action.payload.type];
      state.ingredients = newState;
    },
    removeIngredient: (state, action) => {
      const newState = state.ingredients.map((item) => {
        if (item.type === action.payload.type && item.amount > 0) {
          state.totalPrice -= ingredientPrices[action.payload.type];
          return { ...item, amount: item.amount - 1 };
        } else return { ...item };
      });
      state.ingredients = newState;
    },
  },
});

export default burgerSlice.reducer;
export const { addIngredient, removeIngredient } = burgerSlice.actions;
