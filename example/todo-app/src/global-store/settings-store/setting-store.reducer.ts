import {createReducerSlice} from 'redux-rewire'
import {todoStoreInitialState} from './setting-store.init'
import {Theme} from './setting.type'

export const settingStoreReducer = createReducerSlice(todoStoreInitialState, {
  mount: (state) => {
    state.theme = Theme.LIGHT
    return state
  },
  updateTheme: (state, actionData: Theme) => {
    state.theme = actionData
    return state
  },
})
