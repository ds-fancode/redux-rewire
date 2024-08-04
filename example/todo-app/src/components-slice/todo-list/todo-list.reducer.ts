import {createReducerSlice} from 'redux-rewire'
import {initialState} from './todo-list.init'
import {Todo} from './todo-list.type'

export const todoReducer = createReducerSlice(initialState, {
  mount: (state, actionData: undefined) => state,

  addTodo: (state, actionData: Todo) => {
    return state
  },
})
