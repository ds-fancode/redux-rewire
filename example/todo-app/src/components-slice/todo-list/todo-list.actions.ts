import {createActionSlice} from '@redux-rewire/core'
import {todoReducer} from './todo-list.reducer'
import {settingStore} from '../../global-store/settings-store'
import {Theme} from '../../global-store/settings-store/setting.type'

export const todoAction = createActionSlice(todoReducer, {
  mount: (actionData, {state, store}) => {
    settingStore(store).actions.updateTheme(Theme.DARK)
    return Promise.resolve(null)
  }
})
