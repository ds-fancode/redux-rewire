import {createReducerSlice} from 'redux-rewire'
import {initialState} from './todoListItem.init'

export const reducerSlice = createReducerSlice(initialState, {
  mount: (state) => {
    return state
  },
})
