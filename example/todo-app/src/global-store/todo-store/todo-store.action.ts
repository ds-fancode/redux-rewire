import {createActionSlice} from 'redux-rewire'
import {todoStoreReducer} from './todo-store.reducer'

export const todoStoreAction = createActionSlice(todoStoreReducer, {
  mount: async (actionData, {actions}) => {
    // make api call
    const response = await fetch("https://api.npoint.io/b9a6a4aa275f4c538e9d")
    const jsonData = await response.json()
    actions.updateTodoList(jsonData) // set data from api call into state
  }
})
