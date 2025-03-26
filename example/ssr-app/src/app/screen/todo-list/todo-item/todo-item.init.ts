import {createInitialState} from '@redux-rewire/core'
import type {TodoItemState} from './todo-item.type'

export const initialState = createInitialState<TodoItemState>({
  loaded: false,
  color: 'red'
})
