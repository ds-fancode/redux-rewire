---
sidebar_position: 1
---

# Create Initial State

**Defines the initial state and the corresponding types**

```ts title="to-do-component.init.ts"
import {createInitialState} from 'redux-rewire'

interface InitialStateType { data: string[] }

export const initialState = createInitialState<InitialStateType>(
  "to-do-key", // identity key
  {
    data: [],
  }
);
```

## Type

`State Type`

Pass component state type to `createInitialState` to typesafe your initial state definition

## Arguments

1. `Identity Key`

Can simply be name of the component/file name.

> This helps in advance usage of `useParentState` hook

2. `Initial State`

Initial state with which the component will get initialised


