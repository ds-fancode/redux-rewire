import {createActionSlice} from '@ds-fancode/redux-rewire-core'
import {todoReducer} from './todo-list.reducer'
import {settingStore} from '../../global-store/settings-store'
import {Theme} from '../../global-store/settings-store/setting.type'

export const todoAction = createActionSlice(todoReducer, {
  mount: (actionData, {actions, state, store}) => {
    // previously done thorugh global state as param
    const settingState = settingStore(store).getState()

    settingStore(store).actions.updateTheme(Theme.DARK)

    settingStore(store).subscribe(state => {
      actions.updateInputValue('s')
      console.log('Theme changed:', state.theme)
    })
    return Promise.resolve(null)
  }
})
