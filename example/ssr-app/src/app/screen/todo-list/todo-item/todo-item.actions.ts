import {createActionSlice} from '@redux-rewire/core'
import {todoReducer} from './todo-item.reducer'

export const todoAction = createActionSlice(todoReducer, {
  mount: (actionData, {actions, state, store}) => {
    // previously done thorugh global state as param

    return Promise.resolve(null)
  }
})
