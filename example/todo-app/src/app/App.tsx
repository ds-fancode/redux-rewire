import React, {useEffect} from 'react'
import './App.css'
import {
  configureStore,
  identitySelector,
  noneSelector,
  RewireProvider,
  useGlobalState,
  useRewireState,
} from 'redux-rewire'
import {AppAction} from './App.action'
import TodoListWrapper from '../components-slice/todo-list'
import {settingStore} from '../global-store/settings-store/setting-store'
import reduxLogger from 'redux-logger'

const store = configureStore(
  {},
  {},
  {
    middlewares: [reduxLogger] as any,
  }
)

const AppView = (props: any) => {
  const [key, state, actions] = useRewireState(
    'app-root',
    AppAction,
    identitySelector
  )
  const [, , todoStoreActions] = useGlobalState(settingStore, noneSelector)
  useEffect(() => {
    actions.mount(undefined)
  }, [])

  return (
    <React.StrictMode>
      <RewireProvider store={store}>
        <TodoListWrapper parentKey={key} />
      </RewireProvider>
    </React.StrictMode>
  )
}

export const App = React.memo(AppView)
