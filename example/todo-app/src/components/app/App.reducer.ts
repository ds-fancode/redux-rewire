import {createReducerSlice} from 'redux-rewire'
import {AppInit} from './App.init'


export const AppReducer = createReducerSlice(AppInit, {
  updateInput: (state, actionData: string) => {
    state.inputTodo = actionData
    return state
  },
  resetInput: (state) => {
    state.inputTodo = ''
    return state
  },
})
