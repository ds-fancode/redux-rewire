import {createActionSlice} from '@ds-fancode/redux-rewire-core'
import {settingStoreReducer} from './setting-store.reducer'

export const settingStoreAction = createActionSlice(settingStoreReducer, {
  mount: async (actionData, {actions}) => {
    // make api call
    console.log('settingStoreAction >> actions 1')
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('settingStoreAction >> actions 2')

    actions.loaded()
    return true
  }
})
