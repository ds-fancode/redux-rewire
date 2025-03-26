import {createReducerSlice} from '@redux-rewire/core'
import {initialState} from './todo-item.init'

export const todoReducer = createReducerSlice(initialState, {
  mount: (state, actionData: undefined) => state,
  markDone: (state, actionData) => {
    if (state.todo) {
      state.todo.isDone = true
    }
    return state
  },
  markUnDone: (state, actionData) => {
    if (state.todo) {
      state.todo.isDone = false
    }
    return state
  }
})
