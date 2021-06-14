import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  product: null,
  filteredProduct: null,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    addProduct: (state, action) => {
      state.product = action.payload;
      state.filteredProduct = action.payload;
    },
    updateFilter: (state, action) => {
      state.filteredProduct = action.payload;
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );
      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn("can't remover");
      }
      state.items = newBasket;
    },
    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id == action.payload.id
      );

      if (index >= 0) {
        if (action.payload.quantity > 0) {
          state.items[index].quantity = action.payload.quantity;
        } else {
          let newBasket = [...state.items];
          newBasket.splice(index, 1);
          state.items = newBasket;
        }
      } else
        console.warn(
          `Can't remove product ${action.payload.id} as its does not exist!`
        );
    },
  },
});

export const {
  addToBasket,
  removeFromBasket,
  updateQuantity,
  addProduct,
  updateFilter,
} = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectProduct = (state) => state.basket.product;
export const selectFilteredProducts = (state) => state.basket.filteredProduct;

export const selectTotalItem = (state) =>
  state.basket.items.reduce((total, item) => total + Math.round(item.price), 0);

export default basketSlice.reducer;
