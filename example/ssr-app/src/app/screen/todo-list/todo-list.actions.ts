import {createActionSlice} from '@ds-fancode/redux-rewire-core'
import {todoReducer} from './todo-list.reducer'

export const todoAction = createActionSlice(todoReducer, {
  mount: async (actionData, {actions, state, store}) => {
    // previously done thorugh global state as param
    await new Promise(resolve => setTimeout(resolve, 2000))
    actions.response('do to from SSR')
    return Promise.resolve(null)
  }
})
