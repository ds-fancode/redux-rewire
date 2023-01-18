import { createGlobalState } from "redux-rewire";
import { actionSlice } from "./configStore.action";
import { stateKey } from "./configStore.constant";
export * from "./configStore.selectors";

export const configStore = createGlobalState(stateKey, actionSlice);
