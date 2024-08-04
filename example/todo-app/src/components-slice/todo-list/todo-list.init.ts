import {createInitialState} from 'redux-rewire'
import {TodoListState} from './todo-list.type'

export const initialState = createInitialState<TodoListState, any>('app', {
  loaded: false,
  todoList: [],
})
