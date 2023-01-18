import { createReducerSlice } from "redux-rewire";
import { init } from "./configStore.init";

export const reducerSlice = createReducerSlice(init, {
  updateCartItems: (state, actionData) => {
    const { cartId = null, cartItems = null } = actionData ?? {};
    state.cartItems = cartItems;
    state.cartId = cartId;
    return state;
  },
});
