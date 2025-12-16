import {createInitialState} from '@ds-fancode/redux-rewire-core'
import {TodoListState} from './todo-list.type'

export const initialState = createInitialState<TodoListState>({
  loaded: false,
  inputValue: '',
  todoList: []
})
