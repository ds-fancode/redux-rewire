import {createReducerSlice, identityReducer} from 'redux-rewire'
import {todoStoreInitialState} from './todo-store.init'
import {Todo} from '../../models/models'

export const todoStoreReducer = createReducerSlice(todoStoreInitialState, {
  mount: identityReducer,
  updateTodoList: (state, todoList: Todo[]) => {
    state.todoList = todoList
    return state
  },
  addTodo: (state, todo: string) => {
    const todoItem: Todo = {
      id: Date.now(),
      todo,
      isDone: false
    }
    state.todoList.push(todoItem)
    return state
  },
  removeTodo: (state, id: number) => {
    const foundItemIndex = state.todoList.findIndex(item => item.id === id)
    if (foundItemIndex !== -1) {
      state.todoList.splice(foundItemIndex, 1)
    }
    return state
  },
  editTodo: (state, actionData: {todo: string, id: number}) => {
    const foundItemIndex = state.todoList.findIndex(item => item.id === actionData.id)
    if (foundItemIndex !== -1) {
      state.todoList[foundItemIndex].todo = actionData.todo
    }
    return state
  },
  changeDoneMark: (state, id: number) => {
    const foundItemIndex = state.todoList.findIndex(item => item.id === id)
    if (foundItemIndex !== -1) {
      state.todoList[foundItemIndex].isDone = !state.todoList[foundItemIndex].isDone
    }
    return state
  }
})
