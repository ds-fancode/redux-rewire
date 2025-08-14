import {createReducerSlice} from '@ds-fancode/redux-rewire-core'
import {initialState} from './todo-list.init'
import type {Todo} from './todo-list.type'

export const todoReducer = createReducerSlice(initialState, {
  mount: (state, actionData: undefined) => state,

  addTodo: (state, actionData: string) => {
    state.todoList.push({
      id: state.todoList.length,
      todo: actionData,
      isDone: false
    })
    return state
  },
  handleDone: (state, actionData: Todo) => {
    state.todoList.forEach(todo => {
      if (todo.id === actionData.id) {
        todo.isDone = true
      }
    })
    return state
  },
  handleUnDone: (state, actionData: Todo) => {
    state.todoList.forEach(todo => {
      if (todo.id === actionData.id) {
        todo.isDone = false
      }
    })
    return state
  },
  handleDelete: (state, actionData: Todo) => {
    state.todoList = state.todoList.filter(todo => todo.id !== actionData.id)
    return state
  }
})
