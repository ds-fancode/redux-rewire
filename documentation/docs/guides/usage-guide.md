---
sidebar_position: 1
---

# Usage Guide

The Usage Guides section provides practical guidance on how to correctly use Redux in real-world applications, React or React-Native.

## Installation

Install Redux-Rewire in your project:

```bash
npm install redux-rewire --save-prod
```
OR
```bash
yarn add redux-rewire -S
```

## Initialize the store at the root of your application

```tsx title="app-root.tsx"
import { configureStore, RewireProvider } from "redux-rewire";

function App() {
  const initialReducers = {} // can we empty initially
  const initialState = {} // can we empty initially
  const store = configureStore(initialReducers, initialState, {
    middlewares: [reduxLogger] // We can pass middlewares to the redux
  });

  return (
    <React.StrictMode>
      <RewireProvider store={store}>
        <AppRoutes />
      </RewireProvider>
    </React.StrictMode>
  );
}

export default App;
```

Here, we are using two functions provided by redux-rewire

1. `RewireProvider` The application has to be wrapped with RewireProvider at the root layer.
2. `configureStore` is a wrapper utility for creating an application store that takes the initial state, reducers for updating the state, and any middleware needed for extending application functioning.

***

# Configure a Screen/Page/Component

## 1. Init - `createInitialState`
**Defines the initial state and the corresponding types**

```ts title="to-do-component.init.ts"
import {createInitialState} from 'redux-rewire'

interface InitialStateType { data: string[] }

export const initialState = createInitialState<InitialStateType>("to-do-key",{
  data: [],
});
```

## 2. Reducer - `createReducerSlice`
**Here we define pure functions for the component that updates the state of the component.**

```ts title="to-do-component.reducer.ts"
import { createReducerSlice } from "redux-rewire";
import { initialState } from "./to-do-component.init"; // import init from file generated in step 1

// The intial state created in the homeScreen.init.ts
export const reducerSlice = createReducerSlice(initialState, {
  // @state is the latest state of the to-do component
  // @actionData is the data passed while calling from to-do component
  addInitialToDos: (state, actionData: string[], otherData: {
    componentKey: string, // component key reference used in the global state.
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

## 3. Action - `createActionSlice`
**This file defines the side effects (async calls) for the components such as making analytics call or updating local storage.**

```ts title="to-do-component.action.ts"
import { createActionSlice } from "redux-rewire";
import {  reducerSlice } from "./to-do-component.reducer"; // import reducerSlice from file generated in step 2
export const actionSlice = createActionSlice(reducerSlice, {
  mount: async (actionData: string, otherData: {
    state: InitialStateType, // Updated state of the component
    actions: { mount: (data: string) => {}}, // contains all the list of actions
    reduxKey: string, // component key reference used in the global state
    globalState: any, // global state
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

## 4. View - `useRewireState`
**useRewireState is used to initialize the component state at the runtime, and makes state and actions accessible inside your view.**

> **Key**: string that will be added in the global store and has to be unique.

```tsx title="to-do-component.view.tsx"
import {identitySelector, useRewireState} from 'redux-rewire'
import {actionSlice} from "./to-do-component.action"; // import actionSlice from file generated in step 2
import {useCallback, useRef} from 'react'
const ToDoComponent = (props) => {
  // initializing the state for the component
  const [key, state, actions] = useRewireState(
    'todo-key' + props.someUniqueValueOrIndex, // unique key for the component
    actionSlice,
    identitySelector
  )
  const inputRef = useRef()
  const addToDo = useCallback(() => {
    if (inputRef.current) {
      const value = inputRef.current.value
      actions.add(value)
    }
  }, [actions])
  return (
    <div >
      <div>
        <input ref={inputRef} />
        <button onClick={addToDo}>ADD TO-DO</button>
      </div>
      <div>
        {/* using values from the state to render the JSX */}
        {state.list.map((v) => {
          return <div className={'item'}>Test</div>
        })}
        {state.list.length === 0 ? <div>Your To Do list is empty</div> : null}
      </div>
    </div>
  )
}
export default ToDoComponent
```
