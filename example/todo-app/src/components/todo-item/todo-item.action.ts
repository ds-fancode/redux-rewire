import {createActionSlice} from 'redux-rewire'
import {todoItemReducer} from './todo-item.reducer'

export const todoItemAction = createActionSlice(todoItemReducer, {})
