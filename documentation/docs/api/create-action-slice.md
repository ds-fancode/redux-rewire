---
sidebar_position: 3
---

# Create Action Slice

**This file defines the side effects (async calls) for the components such as making analytics call or updating local storage.**

```ts title="to-do-component.action.ts"
import { createActionSlice } from "redux-rewire";
import { reducerSlice } from "./to-do-component.reducer"; // import reducerSlice from file generated in step 2
export const actionSlice = createActionSlice(reducerSlice, {
  mount: async (actionData, otherData: {
    state: InitialStateType, // Updated state of the component
    actions: { mount: (data: string) => {}}, // contains all the list of actions
    reduxKey: string, // component key reference used in the global state
    globalState: object, // global state
    prevState: InitialStateType, // component previous state
  }) => {

    // The following array returned has nothing to do with redux-rewire,
    // it is application specific
    const toDoList = await getInitialTodosFromBackend()
    actions.addInitialToDos(toDoList)
    return
  },
});
```
## Arguments

1. **`reducerSlice`**

Reducer slice returned from `createReducerSlice`. This helps in providing reducers we have defined, so that we can define actions with same name (type-safety).

> Since we believe in composition, we are passing return type of last definition

2. **`actionMap`**

- Key value pair, to define async functions of actions
- Each function provides 2 arguments
  1. `actionData` - Type definition of actionData is auto-picked from reducer function we have defined before
  2. `otherData` - This contains additional data you may use.
       - `state` - This is readonly current state of component, this provides new manipulated state we get from corresponding reducer execution.
       - `actions` - This contains list of all possible actions we have defined in our reducer.
       - `reduxKey` - This is the final key of the component against which redux has stored this component latest state.
       - `globalState` -  This contains whole redux state, we got using `getState()` api of redux.
       - `prevState` -  This provides the old state of the component before execution of corresponding reducer.

> Since all functions defined here are async we can make any API calls here, and call next reducer function from here itself using `actions` argument we have provided.
