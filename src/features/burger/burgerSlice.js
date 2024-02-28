import { createSlice } from "@reduxjs/toolkit";

const ingredientPrices = {
  salad: 20,
  cheese: 40,
  meat: 90,
};

const initialState = {
  ingredients: [
    { itemType: "salad", amount: 0 },
    { itemType: "cheese", amount: 0 },
    { itemType: "meat", amount: 0 },
  ],
  totalPrice: 80,
};

const burgerSlice = createSlice({
  name: "burger",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const newState = state.ingredients.map((item) => {
        if (item.itemType === action.payload.itemType) {
          return { ...item, amount: item.amount + 1 };
        } else return { ...item };
      });
      state.totalPrice += ingredientPrices[action.payload.itemType];
      state.ingredients = newState;
    },
    removeIngredient: (state, action) => {
      const newState = state.ingredients.map((item) => {
        if (item.itemType === action.payload.itemType && item.amount > 0) {
          state.totalPrice -= ingredientPrices[action.payload.itemType];
          return { ...item, amount: item.amount - 1 };
        } else return { ...item };
      });
      state.ingredients = newState;
    },
  },
});

export default burgerSlice.reducer;
export const { addIngredient, removeIngredient } = burgerSlice.actions;
