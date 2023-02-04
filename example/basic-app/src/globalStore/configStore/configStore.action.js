import { createActionSlice } from "redux-rewire";
import { reducerSlice } from "./configStore.reducer";

export const actionSlice = createActionSlice(reducerSlice, {
  mount: (state, actions, actionData) => {
    console.log("global store mount");
    return [];
  },
  updateCartItems: (state, actions, actionData) => {
    return [];
  },
});
