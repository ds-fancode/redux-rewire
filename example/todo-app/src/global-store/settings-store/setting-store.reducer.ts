import {createReducerSlice} from '@redux-rewire/core'
import {todoStoreInitialState} from './setting-store.init'
import {Theme} from './setting.type'

export const settingStoreReducer = createReducerSlice(todoStoreInitialState, {
  mount: state => {
    state.theme = Theme.LIGHT
    return state
  },
  incrementCount: state => {
    state.count = state.count + 1
    return state
  },

  updateTheme: (state, actionData: Theme) => {
    state.theme = actionData
    return state
  }
})
