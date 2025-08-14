import {createActionSlice} from '@ds-fancode/redux-rewire-core'
import {todoReducer} from './todo-list.reducer'

export const todoAction = createActionSlice(todoReducer, {
  mount: (actionData, {actions, state, store}) => {
    // previously done thorugh global state as param

    return Promise.resolve(null)
  }
})
