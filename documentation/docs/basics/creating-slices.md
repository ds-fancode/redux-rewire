---
sidebar_position: 4
---

# Creating slices

### Creating reducer slice

Reducer slice is the place where we define all the actions that will update the state of the
component. Creating reducer slice takes two arguments, first is the initial state of the component 
and second is the object where all the keys are the name of the actions and values 
are pure function that takes the current state and an action, 
and returns the updated state.

```typescript title="./todo-store.reducer.ts"
import { createReducerSlice } from 'redux-rewire';

export const todoStoreReducer = createReducerSlice(todoStoreInitialState, {
  mount: (state, listId: number) => {
    state.mounted = true
    state.listId = listId
    return state
  },
  updateTodoList: (state, todoList: Todo[]) => {
    state.todoList = todoList
    return state
  }
})
```
In the above code snippet, we have created a reducer slice with two actions `mount` and `updateTodoList`.
`mount` action will be called when the component is mounted and `updateTodoList` will be called when we receive the 
todo list from the backend api call. As we can see all the actions handlers are 
injected with the current component state and actionData is the data passed by the caller.
Later in the tutorial we will see how these actions are called from the component.


### Creating action slice

```typescript title="./todo-store.actions.ts"
import {createActionSlice} from 'redux-rewire'
// todoStoreReducer is basically reducer slice we have created above
import {todoStoreReducer} from './todo-store.reducer'

export const todoStoreAction = createActionSlice(todoStoreReducer, {
  mount: async (actionData, {actions}) => {
    // make api call
    const response = await fetch("https://yourdomain.com/get/user/todo/list")
    const jsonData = await response.json()
    // set data from api call into state
    actions.updateTodoList(jsonData) 
  },
  updateTodoList: async (state, todoList: Todo[]) => {
    /**
     * send analytics once todo list is loaded
     */
    const response = await fetch("https://yourdomain.com/track", {data: todoList})
    return true
  },
  track: async (state, data: any) => {
    /**
     * send any analytics using this action
     */
    const response = await fetch("https://yourdomain.com/track", {data})
    return true
  }
})
```
