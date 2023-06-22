---
sidebar_position: 2
---

# Create Reducer Slice

**Here we define pure functions for the component that updates the state of the component.**

```ts title="to-do-component.reducer.ts"
import { createReducerSlice } from "redux-rewire";
import { initialState } from "./to-do-component.init"; // import init from file generated in step 1

// The intial state created in the homeScreen.init.ts
export const reducerSlice = createReducerSlice(initialState, {
  // @state is the latest state of the to-do component
  // @actionData is the data passed while calling from to-do component
  addInitialToDos: (state, actionData: string[], otherData: {
    reduxKey: string, // component key reference used in the global state.
    globalState: object // global state
  }) => {
    state.list = actionData;
    return state;
  },
  add: (state, actionData: string, otherData: {
    componentKey: string, // component key reference used in the global state
    globalState: any // global state
  }) => {
    state.list.push(actionData);
    return state;
  },
});
```

## Arguments

1. **`initialState`**

Initial state returned from `createInitialState`. This helps in providing state and its type to reducer pure functions.

> Since we believe in composition, we are passing return type of last definition

2. **`reducerMap`**

- Key value pair, to define pure functions of reducers
- Each function provides 3 arguments
  1. `state` - State of the current component (this is a draft state from `immer` lib we have used)
  2. `actionData` - Define type of actionData, this type definition is enforced when we call reducer action from inside view
  3. `otherData` - This contains additional data you may use.
     - `reduxKey` - This is the final key of the component against which redux has stored this component latest state.
     - `globalState` -  This contains whole redux state, we got using `getState()` api of redux.
