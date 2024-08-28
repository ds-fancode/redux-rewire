import {createActionSlice} from '@redux-rewire/core'
import {settingStoreReducer} from './setting-store.reducer'

export const settingStoreAction = createActionSlice(settingStoreReducer, {
  mount: async (actionData, {actions}) => {
    // make api call
  },
})
