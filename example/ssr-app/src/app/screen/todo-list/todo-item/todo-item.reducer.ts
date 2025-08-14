import {createReducerSlice} from '@ds-fancode/redux-rewire-core'
import {initialState} from './todo-item.init'
import type {Todo} from './todo-item.type'

export const todoReducer = createReducerSlice(initialState, {
  mount: (state, actionData: undefined) => state,
  updateToto: (state, actionData: Todo) => {
    state.todo = actionData
    return state
  }
})
