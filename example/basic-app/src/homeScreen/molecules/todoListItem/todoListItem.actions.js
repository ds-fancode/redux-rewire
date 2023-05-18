import { createActionSlice } from "redux-rewire";
import {  reducerSlice } from "./todoListItem.reducer";
export const actionSlice = createActionSlice(reducerSlice, {
  mount: (state, actions, actionData, key, globalState) => {
    return [];
  },
});
