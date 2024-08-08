import {createActionSlice} from 'redux-rewire'
import {todoReducer} from './todo-list.reducer'

export const todoAction = createActionSlice(todoReducer, {
  mount: (actionData: undefined, {state}) => {
    return Promise.resolve(null)
  },
})
