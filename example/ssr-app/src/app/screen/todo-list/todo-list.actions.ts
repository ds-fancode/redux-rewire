import {createActionSlice} from '@ds-fancode/redux-rewire-core'
import {todoReducer} from './todo-list.reducer'

export const todoAction = createActionSlice(todoReducer, {
  mount: async (actionData, {actions, state, store}) => {
    // previously done thorugh global state as param
    console.log('waiting for 1 sec to add data')
    await new Promise(resolve => setTimeout(resolve, 1000))
    actions.response('do to from SSR')
    return Promise.resolve(null)
  }
})
