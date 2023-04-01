import {createReducerSlice} from 'redux-rewire'
import {initialState} from './homeScreen.init'

export const reducerSlice = createReducerSlice(initialState, {
  mount: (state) => {
    return state
  },
  add: (state, actionData, compKey, globalState) => {
    state.list.push(actionData)
    return state
  },
})
