import {createInitialState} from 'redux-rewire'
import {Todo} from '../../models/models'

type ITodoStoreState = {
  todoList: Todo[]
}

export const todoStoreInitialState = createInitialState<ITodoStoreState>('todo-store', {
  todoList: []
})
