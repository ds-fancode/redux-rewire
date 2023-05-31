import {createReducerSlice} from 'redux-rewire'
import {todoItemInitialState} from './todo-item.init'

export const todoItemReducer = createReducerSlice(todoItemInitialState, {
  mount: (state, actionData: string) => {
    state.todoEditInput = actionData
    return state
  },
  updateInput: (state, actionData: string) => {
    state.todoEditInput = actionData
    return state
  },
  resetInput: (state, actionData) => {
    state.todoEditInput = ''
    return state
  },
  setEditing: (state, actionData: boolean) => {
    state.isEditing = actionData
    return state
  },
})
