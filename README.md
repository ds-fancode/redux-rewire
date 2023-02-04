# redux-rewire

## Content
- [Introduction](#Introduction)
- [Installation](#Installation)
- [Basic Usage](#Basic-Usage)
- [API Definitions](#api-definitions)
- [Examples](#Examples)
- [Advance Usage](#Advance-Usage)
- [About](#About)

## Introduction
State management library for react application built on top of redux and react-redux, 
works well with large scale frontend applications

Following are the benefits of redux-rewire

- Incremental store: The state for a component is only added once it is part of the rendered view
- Immutable state: Redux-rewire automatically takes care of state mutation with the help of [immer](https://github.com/immerjs/immer) objects
- Suitable with React Server side rendering.
- Works well with react-native projects.
- Full type safe: Redux-rewire is created with the intention to integrate will with large scale typescript projects


## Installation
Using npm
```shell
npm install redux-rewire --save-prod
```
Using yarn package manager
```shell
yarn add redux-rewire -S
```

## Basic Usage
Initialise the redux-rewire at the root of the app.
```typescript jsx
// App.js
import { configureStore, RewireProvider } from "redux-rewire";
import AppRoutes from './app/appRoutes'

function App() {
  const initialReducers = {}
  const initialState = {}
  const store = configureStore(initialReducers, initialState, {
    middlewares: [], // We can pass middlewares to the redux
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

After the above initialization is done we can create build our stateful components.

Let's take an example of component which is called homeScreen.tsx
- homeScreen.ts
- homeScreen.reducer.ts
- homeScreen.actions.ts
- homeScreen.init.ts

Above the file is suffixed with .reducer, .action is just for the matter of understanding the purpose of file

Start with creating initial state for our home screen component
```typescript
// Following is the content of homeScreen.init.ts

import {createInitialState }from 'redux-rewire'

interface InitialStateType { data: string[] }

export const initialState = createInitialState<InitialStateType>("home-key",{
  data: [],
});
```

Now, we will create the reducers for the component which will update the state
Here, we are adding tha add reducers which will add the todo item in the state

Note: Do not worry about direct state mutation, internally state object is an [immer](https://github.com/immerjs/immer) object

```typescript
// Following is the content of homeScreen.reducers.ts

import { createReducerSlice } from "redux-rewire";
import { initialState } from "./homeScreen.init";

// The intial state created in the homeScreen.init.ts
export const reducerSlice = createReducerSlice(initialState, {
  // state is the latest state of the home screnn component
  // actionData is the data passed while calling from home screen view
  add: (state, actionData: string) => {
    state.list.push(actionData);
    return state;
  },
});

```

Following file contains all the side effects or async task for the homeScreen component 

For eg. we might need to send analytics to the backend when ever the todo item is added

```typescript
// Following is the content of homeScreen.action.ts

import { createActionSlice } from "redux-rewire";
import {  reducerSlice } from "./homeScreen.reducer";
export const actionSlice = createActionSlice(reducerSlice, {
  add: (state, actions, actionData, key, globalState) => {
    
    // The following array returned has nothing to do with redux-rewire, it is application specific
    return [{
      actionType: "Analytics",
      payload: {
        eventNAme: "ToDOAdded",
        data: actionData
      }
    }];
  },
});
```
Now, in the view file we will initial our state using useReduxState api which will add the component state to redux when the view if rendered for the first time

```typescript jsx
// Following is the content of homeScreen.tsx
import {identitySelector, useGlobalState, useReduxState} from 'redux-rewire'
import {actionSlice} from './homeScreen.actions'
import {useCallback} from 'react'

const HomeScreen = (props) => {
  const [key, state, actions] = useReduxState(
    'home-key',
    actionSlice,
    identitySelector
  )
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
        {state.list.map((v) => {
            return <div className={'item'}>Test</div>
        })}
        {state.list.length === 0 ? <div>Your To Do list is empty</div> : null}
      </div>
    </div>
  )
}

  export default HomeScreen


```


## API Definitions
| Api                | input                                          | Description | usage |
|--------------------|------------------------------------------------|-------------|-------|
| createInitialState | (compKey, intialState)                         |             |       |
| createReducerSlice | (state, actionData, compKey, globalState)      |             |       |
| createActionSlice  | (state, actions, actionData, key, globalState) |             |       |
| useReduxState      | (compKey, actionSlice, selectors)              |             |       |


## Examples
Please refer the [examples](https://github.com/ds-fancode/redux-rewire/tree/main/example) directory

## Advance Usage
Coming Soon
## About
Redux-Rewire is developed and maintained by [Fancode](https://www.fancode.com/) and many amazing contributors.

