import React from 'react'
import './App.css'
import {RewireProvider} from 'redux-rewire'
import TodoList from '../components-slice/todo-list'
import {appStore} from '../store'

const AppView = () => {
  return (
    <React.StrictMode>
      <RewireProvider store={appStore}>
        <TodoList />
      </RewireProvider>
    </React.StrictMode>
  )
}

export const App = React.memo(AppView)
