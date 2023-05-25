import {createReducerSlice} from 'redux-rewire'
import {todoItemInitialState} from './todo-item.init'

export const todoItemReducer = createReducerSlice(todoItemInitialState, {
  mount: (actionData: string, {state}) => {
    state.todoEditInput = actionData
    return state
  },
  updateInput: (actionData: string, {state}) => {
    state.todoEditInput = actionData
    return state
  },
  resetInput: (actionData, {state}) => {
    state.todoEditInput = ''
    return state
  },
  setEditing: (actionData: boolean, {state}) => {
    state.isEditing = actionData
    return state
  },
})
