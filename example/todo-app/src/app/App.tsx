import React from 'react'
import './App.css'
import {configureStore, RewireProvider} from 'redux-rewire'
import TodoList from '../components-slice/todo-list'
import {createLogger} from 'redux-logger'
const reduxLogger = createLogger({
  collapsed: true,
  duration: true,
  diff: true,
  timestamp: false,
})
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
        <TodoList />
      </RewireProvider>
    </React.StrictMode>
  )
}

export const App = React.memo(AppView)
