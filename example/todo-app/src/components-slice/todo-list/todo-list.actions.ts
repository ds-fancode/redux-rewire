import {createActionSlice} from '@redux-rewire/core'
import {todoReducer} from './todo-list.reducer'
import {settingStore} from '../../global-store/settings-store'

export const todoAction = createActionSlice(todoReducer, {
  mount: (actionData: undefined, {state, store}) => {
    settingStore(store).actions.mount()
    return Promise.resolve(null)
  }
})
