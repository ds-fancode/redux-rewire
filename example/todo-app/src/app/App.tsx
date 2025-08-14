import React from 'react'
import './App.css'
import {RewireProvider} from '@ds-fancode/redux-rewire-react'
import TodoList from '../components-slice/todo-list'
import {store} from '../store'

const AppView = () => {
  return (
    <React.StrictMode>
      <RewireProvider store={store}>
        <TodoList />
      </RewireProvider>
    </React.StrictMode>
  )
}

export const App = React.memo(AppView)
