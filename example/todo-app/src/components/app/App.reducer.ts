import {createReducerSlice} from 'redux-rewire'
import {AppInit} from './App.init'


export const AppReducer = createReducerSlice(AppInit, {
  updateInput: (actionData: string, {state}) => {
    state.inputTodo = actionData
    return state
  },
  resetInput: (actionData, {state}) => {
    state.inputTodo = ''
    return state
  },
})
