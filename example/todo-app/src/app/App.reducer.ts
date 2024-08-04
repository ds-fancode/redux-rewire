import {createReducerSlice} from 'redux-rewire'
import {AppInit} from './App.init'

export const AppReducer = createReducerSlice(AppInit, {
  mount: (state, actionData: undefined) => state,
  setLoaded: (state, actionData: string) => {
    state.loaded = true
    return state
  },
})
