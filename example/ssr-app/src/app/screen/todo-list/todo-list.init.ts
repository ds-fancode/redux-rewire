import {createInitialState} from '@redux-rewire/core'
import type {TodoListState} from './todo-list.type'

export const initialState = createInitialState<TodoListState>({
  loaded: false,
  inputValue: '',
  todoList: [
    {id: 1, todo: 'something', isDone: false},
    {id: 1, todo: 'something completeddddd', isDone: true}
  ]
})
