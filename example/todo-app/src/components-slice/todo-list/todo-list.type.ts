export interface Todo {
  id: number
  todo: string
  isDone: boolean
}

export interface TodoListState {
  loaded: boolean
  inputValue: string
  todoList: Todo[]
}
