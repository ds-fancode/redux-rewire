import {createActionSlice} from 'redux-rewire'
import {todoStoreReducer} from './todo-store.reducer'

export const todoStoreAction = createActionSlice(todoStoreReducer, {
  mount: async (actionData, {actions}) => {
    // make api call
    actions.updateTodoList([]) // set data from api call into state
  }
})
