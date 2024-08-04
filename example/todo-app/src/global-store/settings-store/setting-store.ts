import {createGlobalState} from 'redux-rewire'
import {settingStoreAction} from './setting-store.action'

const todoStoreKey = '*todo-store'
export const settingStore = createGlobalState(
  todoStoreKey,
  settingStoreAction,
  true
)
