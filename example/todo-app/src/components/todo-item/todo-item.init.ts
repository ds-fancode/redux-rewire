import {createInitialState} from 'redux-rewire'

type ITodoItemStateType = {
  isEditing: boolean
  todoEditInput: string
}

export const todoItemInitialState = createInitialState<ITodoItemStateType>('todo-item', {
  isEditing: false,
  todoEditInput: ''
})
