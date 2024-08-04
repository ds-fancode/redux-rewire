export interface Todo {
  id: number
  todo: string
  isDone: boolean
}

export interface TodoListState {
  loaded: boolean
  todoList: Todo[]
}
