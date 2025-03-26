export interface Todo {
  id: number
  todo: string
  isDone: boolean
}

export interface TodoItemState {
  loaded: boolean
  todo?: Todo
  color: string
}
