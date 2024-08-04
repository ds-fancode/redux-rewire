import React from 'react'
import './App.css'
import {configureStore, RewireProvider} from 'redux-rewire'
import TodoListWrapper from '../components-slice/todo-list'
import reduxLogger from 'redux-logger'

const store = configureStore(
  {},
  {},
  {
    middlewares: [reduxLogger] as any,
  }
)

const AppView = (props: any) => {
  return (
    <React.StrictMode>
      <RewireProvider store={store}>
        <TodoListWrapper />
      </RewireProvider>
    </React.StrictMode>
  )
}

export const App = React.memo(AppView)
