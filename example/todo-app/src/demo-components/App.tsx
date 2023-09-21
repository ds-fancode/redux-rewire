import React from 'react'
import './styles.css'
import AddTodo from './add-todo'
import TodoListWrapper from './todo-list-wrapper'

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading">Demo Task Todo</span>
      <AddTodo />
      <TodoListWrapper />
    </div>
  )
}

export default App
